// routes/index.js
 
module.exports = function(app, UserScreen)
{
    // GET ALL USERSCREENS
    app.get('/api/userScreens', function(req,res){
        console.log("userScreens------------->");
        console.log('req.query 11------------>', req.query);
        
        UserScreen.find({
        	email: req.query.email 
        }, function(err, userScreens) {
            if(err){
                console.error(err);
                res.end();
                return;
            }
            
            res.json(userScreens);
        });
    });
 
    // CREATE USERSCREENS
    app.post('/api/userScreens', function(req, res){
        var userScreen = new UserScreen();
        userScreen.screen_id = req.body.screen_id;
        userScreen.email = req.body.email;
        userScreen.company_id = req.body.company_id;
     
        userScreen.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
     
            res.json({result: 1});
        });
    });
 
    // UPDATE THE USERSCREENS
    app.put('/api/userScreens/:email/:screen_id', function(req, res){
        res.end();
    });
 
    // DELETE USERSCREENS
    app.delete('/api/userScreens/:email/:screen_id/:company_id', function(req, res){
        UserScreen.remove({
            email: req.params.email,
            screen_id: req.params.screen_id,
            company_id: req.params.company_id
        }, function(err, userScreen) {
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({ message: 'Successfully deleted' });
        });
	});
 
}