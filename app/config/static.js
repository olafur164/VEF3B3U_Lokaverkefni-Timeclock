module.exports = function(app, express, path){
    
	app.use(express.static(path.join(__dirname, '../../public')));
	app.use('/css', express.static(path.join(__dirname, '../../node_modules/font-awesome/css/')))
	app.use('/css/material.min.css', express.static(path.join(__dirname, '../../node_modules/material-design-lite/dist/material.teal-green.min.css')))
	app.use('/js/material.min.js', express.static(path.join(__dirname, '../../node_modules/material-design-lite/dist/material.min.js')))

};
