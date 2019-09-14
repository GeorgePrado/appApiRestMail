'use strict';
var mysql = require('./db.js');

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.createTask = function(newTask, result){
    mysql.query("INSERT INTO tasks set ?", newTask, function(err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Task.getTaskById = function(taskId, result) {
    mysql.query("SELECT task FROM tasks WHERE id = ? ", taskId, function(err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }else{
            result(null, res); 
            }
    });
};

Task.getAllTask = function(result){
    mysql.query("SELECT * FROM tasks", function(err, res){
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            console.log('tasks :', res);
            result(null, res);
        }
    });
};

Task.updateById = function(id, task, result){
    mysql.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function(err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }else{
            result(null, res);
        }
    });
};

Task.remove = function(id, result) {
    mysql.query("DELETE FROM tasks WHERE id = ?", [id], function(err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }else {
            result(null, res);
        }
    });
};

module.exports = Task;