const express = require('express');
const app = express();

const portNo = process.env.PORT;

app.listen(portNo, () => console.log(`Application is listening on PORT: ${portNo}`));

app.get('*', function(req, res){
    console.log(`On Port: ${portNo}`);
    res.send(`Forward To: ${portNo}`);
});