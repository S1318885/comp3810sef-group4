const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['s3cr3tK3y!2025'],
  maxAge: 24 * 60 * 60 * 1000
}));

const uri = 'mongodb+srv://s1318885:13188853@cluster0.irowwas.mongodb.net/3810SEFDB?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => console.log('MongoDB: 3810SEFDB'))
  .catch(err => console.error(err));

const Task = require('./models/task');
const User = require('./models/user');

const isAuthenticated = (req, res, next) => {
  if (req.session.authenticated) return next();
  res.redirect('/login');
};


app.get('/', (req, res) => res.redirect('/login'));

app.get('/login', (req, res) => res.render('login'));
app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    req.session.authenticated = true;
    req.session.username = user.username;
    res.redirect('/crud');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/register', (req, res) => res.render('register'));
app.post('/register', async (req, res) => {
  if (await User.findOne({ username: req.body.username })) {
    return res.status(400).send('Username taken');
  }
  const hashed = await bcrypt.hash(req.body.password, 10);
  await new User({ username: req.body.username, password: hashed }).save();
  res.redirect('/login');
});

app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
});

app.get('/crud', isAuthenticated, async (req, res) => {
  const { search, status, sort } = req.query;
  let query = {};
  if (search) query.title = { $regex: search, $options: 'i' };
  if (status && status !== 'all') query.completed = (status === 'completed');

  const tasks = await Task.find(query)
    .sort(sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 });

  res.render('crud', {
    tasks,
    username: req.session.username,
    search: search || '',
    status: status || 'all',
    sort: sort || 'newest'
  });
});

app.post('/crud', isAuthenticated, async (req, res) => {
  await new Task({ title: req.body.title, description: req.body.description }).save();
  res.redirect('/crud');
});

app.get('/crud/edit/:id', isAuthenticated, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send('Not found');
  res.render('edit', { task, username: req.session.username });
});

app.post('/crud/update/:id', isAuthenticated, async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed === 'on'
  });
  res.redirect('/crud');
});

app.post('/crud/delete/:id', isAuthenticated, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect('/crud');
});

app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

app.put('/api/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) return res.status(404).json({ error: 'Not found' });
  res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
  const result = await Task.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

app.get('/api/tasks/stats', async (req, res) => {
  const total = await Task.countDocuments();
  const completed = await Task.countDocuments({ completed: true });
  res.json({ total, completed, pending: total - completed });
});

app.get('/api/tasks/search', async (req, res) => {
  const { q } = req.query;
  const tasks = await Task.find({ title: { $regex: q, $options: 'i' } }).limit(10);
  res.json(tasks);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});