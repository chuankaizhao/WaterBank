function indexPlot(stocks, names){
    var data = [];
    var fy = function(d) {
        d.price;
    }
    var fx = function(d) {
        d.index;
    }
    var ft = function() {
        data[this.parent.index].ticker;
    }
    var w = 800;
    var h = 500;
    var S = pv.max(pv.values(stocks), function(s) {s.values.length});
    var idx = Math.floor(S/2) - 1;
    var x = pv.Scale.linear(0,S-1).range(0,w);
    var y = pv.Scale.linear(-1,5).range(0,h);
    var rescale = true;

    /* Normalize the data according to an index point. */
    var indexify = function(data, cols, idx) {
        return cols.map(function(c) {
            var v = data[c].values[idx];
            return { ticker: c,
                values: data[c].values.map(function(d,i) {
                          return {index:i, price:((d-v)/v)}; }) 
            }
        });
    };

    console.log(stocks);
    console.log(names);

    /* Compute new index values, rescale if needed, and render. */
    var update = function() {
        data = indexify(stocks, names, idx);
        if (rescale) {
          var min = pv.min(data.map(function(d) {pv.min(d.values, fy)}));
          var max = pv.max(data.map(function(d) {pv.max(d.values, fy)}));
        }
        y.domain(min, max).nice();
        vis.render();
    }

    /* The visualization panel. Stores the active index. */
    var vis = new pv.Panel()
        .def("i", -1)
        .left(60)
        .right(70)
        .top(20.5)
        .bottom(18)
        .width(w)
        .height(h);

    /* Horizontal gridlines showing %-change. */
    vis.add(pv.Rule)
        .data(function() {y.ticks(8)})
        .bottom(y)
        .strokeStyle(function(d) {d==0 ? "black" : "#cccccc"})
      .anchor("left").add(pv.Label)
        .text(function(d) {(d * 100).toFixed(0) + "%"});

    /* Y-axis label */
    vis.add(pv.Label)
        .data(["Normalized Value"])
        .left(-45)
        .bottom(h/2)
        .font("10pt Arial")
        .textAlign("center")
        .textAngle(-Math.PI/2);

    /* Stock lines. */
    vis.add(pv.Panel)
        .data(function() {data})
      .add(pv.Line)
        .data(function(d) {d.values})
        .left(x.by(fx))
        .bottom(y.by(fy))
        .lineWidth(2)
      .add(pv.Label)
        .visible(function() {this.index == S-1})
        .textBaseline("middle")
        .textMargin(6)
        .text(ft);

    /* Current index line. */
    vis.add(pv.Rule)
        .visible(function() {idx >= 0 && idx != vis.i()})
        .left(function() {x(idx)})
        .top(-4)
        .bottom(-4)
        .strokeStyle("red")
      .anchor("bottom").add(pv.Label)
        .text(function() {stocks.Date.values[idx]});

    /* An invisible bar to capture events (without flickering). */
    vis.add(pv.Panel)
        .events("all")
        .event("mousemove", function() { idx = x.invert(vis.mouse().x) >> 0; update(); });

    update();
}