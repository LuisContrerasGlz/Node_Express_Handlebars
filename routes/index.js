const { Router }= require('express');
const router = Router();
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const json_notes=fs.readFileSync('./db/db.json','utf-8');
//let notes=JSON.parse(json_notes);

var mysql = require("mysql");

if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    conn = mysql.createConnection({
        host: "localhost",
        database: "burgers",
        user: "root",
        password: ""
    });
}

conn.connect(function(error){
    if (error){
        console.log("coneccion con error", error);
        //throw error;
    }else{
        console.log("coneccion existosa");
    }
})

//var PORT = process.env.PORT || 3000;



router.get('/', (req, res)=>{
  res.render('index.ejs');
})

router.get('/notes', (req, res)=>{
    menui=[];
    menud=[];
    conn.query("select name,id from menu where status=0", function(error, results, fields){
        if (error){
            console.log("error de consulta ", error);
        }else{
            results.forEach(result => {
                let d = {
                           name: result.name, 
                           id: result.id
                        }
                        console.log(d);
                menui.push(d);
            });
            console.log("select name,id from menu")
            console.log(menui);
            conn.query("select name,id from menu where status=1", function(error, results, fields){
                if (error){
                    console.log("error de consulta ", error);
                }else{
                    results.forEach(result => {
                        let d = {
                                   name: result.name, 
                                   id: result.id
                                }
                                console.log(d);
                        menud.push(d);
                    });                
                    res.render('notes.ejs',{
                        menui,menud
                    });
                }
            });
        }
    } );

  })

router.post('/notes', (req, res)=>{
    const {burger}=req.body;
    console.log(burger)
    conn.query("insert into menu (name,status) values ('"+burger+"',0)",function(error, results){
        if (error){
            console.log("error de consulta ", error);
        }
    } )
    menui=[];
    menud=[];
    conn.query("select name,id from menu where status=0", function(error, results, fields){
        if (error){
            console.log("error de consulta ", error);
        }else{
            results.forEach(result => {
                let d = {
                           name: result.name, 
                           id: result.id
                        }
                        console.log(d);
                menui.push(d);
            });
            console.log("select name,id from menu")
            console.log(menui);
            conn.query("select name,id from menu where status=1", function(error, results, fields){
                if (error){
                    console.log("error de consulta ", error);
                }else{
                    results.forEach(result => {
                        let d = {
                                   name: result.name, 
                                   id: result.id
                                }
                                console.log(d);
                        menud.push(d);
                    });                
                    res.render('notes.ejs',{
                        menui,menud
                    });
                }
            });
        }
    } );
})  

router.get('/menu/:id', (req,res)=>{
    conn.query("update menu set status=0 where id="+req.params.id,function(error, results){
        if (error){
            console.log("error de consulta ", error);
        }
    } )
    menui=[];
    menud=[];
    conn.query("select name,id from menu where status=0", function(error, results, fields){
        if (error){
            console.log("error de consulta ", error);
        }else{
            results.forEach(result => {
                let d = {
                           name: result.name, 
                           id: result.id
                        }
                        console.log(d);
                menui.push(d);
            });
            console.log("select name,id from menu")
            console.log(menui);
            conn.query("select name,id from menu where status=1", function(error, results, fields){
                if (error){
                    console.log("error de consulta ", error);
                }else{
                    results.forEach(result => {
                        let d = {
                                   name: result.name, 
                                   id: result.id
                                }
                                console.log(d);
                        menud.push(d);
                    });                
                    res.render('notes.ejs',{
                        menui,menud
                    });
                }
            });
        }
    } );
}) 

    router.get('/eat/:id', (req,res)=>{
        conn.query("update menu set status=1 where id="+req.params.id,function(error, results){
            if (error){
                console.log("error de consulta ", error);
            }
        } )
        menui=[];
        menud=[];
        conn.query("select name,id from menu where status=0", function(error, results, fields){
            if (error){
                console.log("error de consulta ", error);
            }else{
                results.forEach(result => {
                    let d = {
                               name: result.name, 
                               id: result.id
                            }
                            console.log(d);
                    menui.push(d);
                });
                console.log("select name,id from menu")
                console.log(menui);
                conn.query("select name,id from menu where status=1", function(error, results, fields){
                    if (error){
                        console.log("error de consulta ", error);
                    }else{
                        results.forEach(result => {
                            let d = {
                                       name: result.name, 
                                       id: result.id
                                    }
                                    console.log(d);
                            menud.push(d);
                        });                
                        res.render('notes.ejs',{
                            menui,menud
                        });
                    }
                });
            }
        } );









})

router.post('/modify/:id', (req, res)=>{
    let aux_title="";
    let aux_text="";
    let aux_id="";
    const {title, text}=req.body;
    let mod_note = {
        id:req.params.id,
        title:title,
        text:text
    }
    console.log(mod_note);
    let cont=0;
    let enc=-1;
    notes.forEach(function (note){
        if (note.id==req.params.id){
            enc=cont;
        }else{
            console.log(note.id);
            cont=cont+1;
        }
    })
    console.log(cont);
    console.log(enc);
    if (enc!=-1){
        notes.splice(enc,1,mod_note);
        const json_notes=JSON.stringify(notes);
        fs.writeFileSync('./db/db.json',json_notes,'utf-8');
    }else{
        console.log("no lo encntre");
    }
    
    res.render('notes.ejs',{
        notes,  aux_title, aux_text, aux_id
    });
  })  



module.exports = router;

