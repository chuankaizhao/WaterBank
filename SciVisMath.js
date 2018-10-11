//University of Illinois/NCSA Open Source License
//Copyright (c) 2015 University of Illinois
//All rights reserved.
//
//Developed by: 		Eric Shaffer
//                  Department of Computer Science
//                  University of Illinois at Urbana Champaign
//
//
//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//documentation files (the "Software"), to deal with the Software without restriction, including without limitation
//the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//Redistributions of source code must retain the above copyright notice, this list of conditions and the following
//disclaimers.Redistributions in binary form must reproduce the above copyright notice, this list
//of conditions and the following disclaimers in the documentation and/or other materials provided with the distribution.
//Neither the names of <Name of Development Group, Name of Institution>, nor the names of its contributors may be
//used to endorse or promote products derived from this Software without specific prior written permission.
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
//WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//CONTRIBUTORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
//TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//DEALINGS WITH THE SOFTWARE.


//--------------------------------------------------------
//The infamous rainbow color map, normalized to the data range
function rainbow_colormap(fval, fmin, fmax){
    var dx=0.8;
    var fval_nrm = (fval-fmin)/(fmax-fmin); //normalize in put to [0, 1]
    // map to [0, 1]^3
    
    var g = (6.0-2.0*dx)*fval_nrm +dx;
    var R = Math.max(0.0,(3.0-Math.abs(g-4.0)-Math.abs(g-5.0))/2.0 )*255;
    var G = Math.max(0.0,(4.0-Math.abs(g-2.0)-Math.abs(g-4.0))/2.0 )*255;
    var B = Math.max(0.0,(3.0-Math.abs(g-1.0)-Math.abs(g-2.0))/2.0 )*255;
    color = [Math.round(R),Math.round(G),Math.round(B),255];
	return color;
}

function generate_data(year, data){
    var fill_values = {};
    var fill_colors = {};
    var year = "2015.0";
    var countries = Object.keys(curr_data);         
    var fmin = Infinity;
    var fmax = -Infinity;
    for(var i=0; i< countries.length; i++){
        var code = countries[i];
        var fval = parseFloat(data[code][year]);
        if(fval!=NaN){
            if (fval < fmin){
            fmin = fval;
            }
            if (fval > fmax){
                fmax = fval;
            }    
        }
    }
    console.log(fmin, fmax);
    fmax = 786;
    for (var i=0; i< countries.length; i++){
        var code = countries[i];
        var fval = parseFloat(data[code][year]);
        console.log(fval);
        var color = rainbow_colormap(fval, fmin, fmax);
        var color_s = 'rgba(' + color[0].toString() + ',' + color[1].toString() + ',' + color[2].toString() + ',0.9)';    
        fill_colors[i.toString()] = color_s;
        fill_values[code] = {'fillKey': i.toString()};
    }
    return [fill_values, fill_colors];
}
function generate_color_data(year, data){
    var series = [];
    var countries = Object.keys(data);
    for (var i=0; i< countries.length; i++){
        var code = countries[i];
        if (year in data[code]){
            var fval = parseFloat(data[code][year]);
            series.push([code, fval]);
        }
    }
    console.log(series);
    return series;
}