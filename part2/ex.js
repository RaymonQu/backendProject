const http = require('http');

const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res)=> {
    res.send('hello wirld');
});

const courses = [
    {id: 1, name:'Web Development'},
    {id: 2, name:'IT'},
    {id:3, name:"CYBERSECURITY"},
];

app.get('/api/courses', (req,res) => {
    res.send(courses);
})

app.get('/api/coureses:id', (req, res) =>{
    const course = courses.find(c=> c.id === parseInt(req.params.id))
    if(!course){
        res.status(404).send("Not found");
        return;
    }
    res.send(course);
})
//HTTP POST REQUESTS

app.post('/api/courses', (req,res) => {
    // you write the if code here
    if(req.body.name.length <= 4){
        res.status.send("invalid name length");
        return;
    }
    //add an if statement so that the name of the course you post is .min(3) characters 
        const course ={
            //we assign an ID and a name property
            id: courses.length +1,
            name:req.body.name
    }
            //YOU WRITE THE NEXT LINES OF code
          //next step: push it to the array
            //next step: the server should return the new resource to the client in the body of the response
            courses.push(course);
});

    //here we need the specific id of the course we want to update
app.put('/api/courses/:id', (req,res)=>{
//    Write the code in order to look up the course, if not existing return a 404
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course){
        res.status(404).send('The course was not found.');
        return;
    }
    course.name = req.body.name;
    res.send(course);
            //otherwise 
                    //update the course
                    //return the updated course
    });
    
app.delete('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course){
        res.status(404).send('courseot found.');
        return;
    }
    courses.splice(courses.indexOf(course), 1);
    res.send(course);
});

app.listen(3000, () => {
    console.log('listening on port 3000');
})