import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

const post = new Router(); // /api/posts/:id
post.get('/:id', postsCtrl.read);
post.delete('/:id', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
post.patch('/:id', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

post.use('/:id', postsCtrl.getpostById, post.routes());

export default posts;