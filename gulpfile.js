var fs = require("fs");
var gulp = require("gulp");
var replace = require("gulp-replace-task");
var rename = require("gulp-rename");

var getResultsForLeague = require("./src/get-results-for-league");

gulp.task("default", ["watch"]);

gulp.task("watch", function () {
  gulp.watch("src/**", ["build"]);
});

gulp.task("build", function () {
  var basePath = __dirname + "/leagues";
  var leagues = fs.readdirSync(basePath);

  leagues.forEach(function (leagueName) {
    var results = getResultsForLeague(basePath, leagueName);

    gulp.src("src/template.html")
      .pipe(replace({
        patterns: [
          {
            match: "name",
            replacement: leagueName
          },
          {
            match: "results",
            replacement: results
          }
        ]
      }))
      .pipe(rename(leagueName + ".html"))
      .pipe(gulp.dest("build"));
  })
});
