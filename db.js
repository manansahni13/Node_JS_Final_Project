const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/todos.db'
})

const Todos = db.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(500)
    },
    duedate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING(200),
        allowNull: false,
        // defaultValue: "incomplete"
    },
    priority: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    note: {
        type:Sequelize.STRING(1000)
    }
    
})

module.exports = {
    db, Todos
}