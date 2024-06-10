const Posts = require('./Posts');
const Comments = require('./Comments');
const User = require('./User');

Comments.belongsTo(Posts, {
    foreignKey: 'post_id',
});

Posts.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

User.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Posts.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = {
    Comments,
    Posts,
    User,
};