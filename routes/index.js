// routes to different Module
module.exports = (app, models) => {
    require('./userRoutes')(app, models);
    require('./spamReportRoutes')(app, models);
    require('./contactRoutes')(app, models);
};