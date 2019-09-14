'use strict';

const Task = require('../model/appModel.js');
//requerimos el paquete de envio de mensaje
const nodemailer = require('nodemailer');

exports.list_all_tasks = function(req, res){
    Task.getAllTask(function(err,task){
        console.log('controller');
        if(err)
            res.send(err);
            console.log('res', task);
        res.send(task);    
    });
};

exports.create_a_task = function(req, res){

    var new_task = new Task(req.body);
    console.log("se inserta nueva tarea");
    console.log(req.body);

    // enviamos los datos del usuario que quiere contactar
    //creamos el objeto de transporte
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nikecoachlima@gmail.com',
            pass: 'nikerunclub'
        }
    });

    var mensaje = "Datos del contacto. Correo: " + req.body.correo + " Nombre : " + req.body.nombre + " Celular : " + req.body.celular;

    var mailOptions = {
        from: 'nikecoachlima@gmail.com',
        to: 'backend@mullenlowe.pe',
        subject: 'Asunto Del correo',
        text: mensaje
    };


    transporter.sendMail(mailOptions, function(error, info){
        if(error){
        console.log(error);
        }else{
        console.log('Email enviado: ' + info.response);
        }
    });
    
    //manejamos los errores null
    if(!new_task.task || !new_task.status){
        res.status(400).send({ error: true, message: 'Please provide task/status' });      
        }
    else{
        Task.createTask(new_task, function(err, task){
        if(err)
            res.send(err);
        res.json(task);  
        });
    }   
};

exports.read_a_task = function(req, res){
    Task.getTaskById(req.params.taskId, function(err, task){
        if(err)
            res.send(err);
        res.json(task);
    });
};

exports.update_a_task = function(req, res){
    Task.updateById(req.params.taskId, new Task(req.body), function(err, task){
        if(err)
            res.send(err);
        res.json(task); 
    });
};

exports.delete_a_task = function(req, res){
    Task.remove(req.params.taskId, function(err, task){
        if(err)
            res.send(err);
        res.json({ message: 'Task successfully deleted '});
    });
};