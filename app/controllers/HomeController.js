exports.Index = function(req, res){
    res.pageInfo = {};
    res.pageInfo.title = 'Hello World';
    res.render('home/Index', res.pageInfo);
};