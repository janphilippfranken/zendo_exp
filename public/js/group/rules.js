function Rule1(td)
{
	console.log('rule: there is a red');

	count = 0;
	for (var i=0; i<td.colours.length; i++)
	{
		if (td.colours[i]==='red')
		{
			count++;
		}
	}

	if (count>0)
	{
		return true;
	} else {
		console.log('count', count, 'td.sizes.length', td.sizes.length);
		return false;
	}
}

function Rule2(td)
{
    console.log('rule: they are all the same size');

    var out = true;
    var sze = td.sizes[0]
    for (var i=0; i<td.sizes.length; i++)
    {
        if (td.sizes[i]!==sze)
        {
            out = false;
        }
    }

    return out;
}

function Rule3(td)
{
	console.log('rule: none are upright');

	count = 0;
	for (var i=0; i<td.sizes.length; i++)
	{
		if (td.orientations[i]!=='upright')
		{
			count++;
		}
	}

	if (count===td.ids.length)
	{
		return true;
	} else {
		return false;
	}
}

function Rule4(td)
{
    console.log('rule: one is blue');

    count = 0;
    for (var i=0; i<td.sizes.length; i++)
    {
        if (td.colours[i]==='blue')
        {
            count++;
        }
    }

    if (count===1)
    {
        return true;
    } else {
        return false;
    }
}

function Rule5(td)
{
    console.log('rule: at least one is blue AND small');

    count = 0;
    for (var i=0; i<td.sizes.length; i++)
    {
        if (td.colours[i]==='blue' & td.sizes[i]==1)
        {
            count++;
        }
    }

    if (count>0)
    {
        return true;
    } else {
        return false;
    }
}


function Rule6(td)
{
    console.log('rule: all are blue OR small');

    count = 0;
    for (var i=0; i<td.sizes.length; i++)
    {
        if (td.colours[i]==='blue' | td.sizes[i]==1)
        {
            count++;
        }
    }

    if (count===td.ids.length)
    {
        return true;
    } else {
        return false;
    }
}

function Rule7(td)
{
    console.log('rule: a red is bigger than all nonreds', td);

    var x = [];
    var y = [];

    for (var i=0; i<td.colours.length; i++)
    {
        if (td.colours[i]==='red')
        {
            x.push(td.sizes[i])
        } else if (td.colours[i]!=='red')
        {
            y.push(td.sizes[i])
        }
    }

    var outer_res = [];
    for (var i=0; i<x.length; i++)
    {
        var inner_res = [];
        for (var j=0; j<y.length; j++)
        {
            inner_res.push(x[i]>y[j]);
        }
        outer_res.push(inner_res.every(isTrue));
    }
    console.log('check rule 7', x, y, inner_res, outer_res, outer_res.some(isTrue));
    return outer_res.some(isTrue)
}

function Rule8(td)
{
    console.log('rule: contact');

    var out = false;
    
    for (var i=0; i<td.contact.length; i++)
    {
        if (td.contact[i].length>1){
            out = true;
        }
    }
    
    return out
}

function Rule9(td)
{
    console.log('rule: blue to red contact');
    // TODO GO FROM HERE
    var x = [];
    var y = [];

    for (var i=0; i<td.colours.length; i++)
    {
        if (td.colours[i]==='red')
        {
            x.push(td.contact[i])
        } else if (td.colours[i]==='blue')
        {
            y.push(td.ids[i])
        }
    }
    // var x = td.contact[td.colours.map(==='red'];
    //var y = td.ids[td.colours==='blue'];

    var out = false;
    
    for (var i=0; i<x.length; i++)
    {
        for (var j=0; j<y.length; j++)
        {
            for (var k=0; k<x[i].length; k++)
            {
                if (x[i][k]==y[j]){
                    out = true;
                }
            }
        }
    }
    
    return out
}

function Rule10(td)
{
    console.log('rule: stacked');

    var out = false;
    
    for (var i=0; i<td.ids.length; i++)
    {
        for (var j=0; j<td.ids.length; j++)
        {
           if ( (td.grounded[i]==="yes" & td.grounded[j]==="no") &
            ((Math.round(td.xpos[i]*100)/100) === (Math.round(td.xpos[j]*100)/100) & td.orientations[i]===td.orientations[j]))
           {
            out = true;
           }
        }
    }
    
    return out
}


isTrue = function(x){
    return x===true
}
// c("any(equal(instance$colour, 'red'))",
//          "rel('all', T,T,'all',T,T,equal,'size')",
//          "all(not(equal(instance$orientation, 'upright')))",
//          "n(equal(instance$colour, 'blue'), 1)",
//          "any(and(equal(instance$colour, 'blue'), equal(instance$size, 1)))",
//          "all(or(equal(instance$colour, 'blue'), equal(instance$size, 1)))",
//          "rel('any', F, equal(instance$colour, 'red'), 'all', T, not(equal(instance$colour, 'red')), greater, 'size')",
//          "rel('any', F, T, 'any', F, T, hor, 'contact')",
//          "rel('any', F, equal(instance$colour, 'blue'), 'any', F, equal(instance$colour, 'red'), hor, 'contact')",
//          "rel('any', F, and(equal(instance$orientation, 'upright'), equal(instance$grounded, T)), 'any', F,  and(equal(instance$orientation, 'upright'), equal(instance$grounded, F)), equal,  'xpos', equal, 'orientation')")  # hor, 'contact', 'xpos', greater,

// function Rule3(td)
// {
//   console.log('td',td, 'rule: nothing is upright NOT IMPLEMENTED YET');

//   //Temporary rule There must be exactly 2 blues
//   count = 0;
//   for (i=0; i<td.orientations.length; i++)
//   {
//     console.log(i, td.orientations[i]);
//     // if (td.colours[i]==='blue')
//     // {
//     //   count++;
//     // }
//   }

//   if (count===0)
//   {
//     return true;
//   } else {
//     return false;
//   }
// }
// 
// examples = [{positions:[{x:4.08,y:4.125},{x:3.07,y:4.12},{x:4.08,y:3.81}],
// rotations:[Math.PI, Math.PI, Math.PI],
// ids:[0,1,2],
// colours:["green","blue","red"],
// sizes:["large","large","large"]},
// {positions:[{x:4.08,y:4.125},{x:3.07,y:4.12},{x:4.08,y:3.81}],
// rotations:[Math.PI, Math.PI, Math.PI],
// ids:[0,1,2],
// colours:["green","blue","red"],
// sizes:["large","large","large"]}
// ];

// test_cases = [{positions:[{x:4.08,y:4.125},{x:3.07,y:4.12},{x:4.08,y:3.81}],
// rotations:[Math.PI, Math.PI, Math.PI],
// ids:[0,1,2],
// colours:["green","blue","red"],
// sizes:["large","large","large"]},
// {positions:[{x:4.08,y:4.125},{x:3.07,y:4.12},{x:4.08,y:3.81}],
// rotations:[Math.PI, Math.PI, Math.PI],
// ids:[0,1,2],
// colours:["green","blue","red"],
// sizes:["large","large","large"]},
// {positions:[{x:4.08,y:4.125},{x:3.07,y:4.12},{x:4.08,y:3.81}],
// rotations:[Math.PI, Math.PI, Math.PI],
// ids:[0,1,2],
// colours:["green","blue","red"],
// sizes:["large","large","large"]},
// {positions:[{x:4.08,y:4.125},{x:3.07,y:4.12},{x:4.08,y:3.81}],
// rotations:[Math.PI, Math.PI, Math.PI],
// ids:[0,1,2],
// colours:["green","blue","red"],
// sizes:["large","large","large"]},
// {positions:[{x:4.08,y:4.125},{x:3.07,y:4.12},{x:4.08,y:3.81}],
// rotations:[Math.PI, Math.PI, Math.PI],
// ids:[0,1,2],
// colours:["green","blue","red"],
// sizes:["large","large","large"]},
// {positions:[{x:4.08,y:4.125},{x:3.07,y:4.12},{x:4.08,y:3.81}],
// rotations:[Math.PI, Math.PI, Math.PI],
// ids:[0,1,2],
// colours:["green","blue","red"],
// sizes:["large","large","large"]},
// {positions:[{x:4.08,y:4.125},{x:3.07,y:4.12},{x:4.08,y:3.81}],
// rotations:[Math.PI, Math.PI, Math.PI],
// ids:[0,1,2],
// colours:["green","blue","red"],
// sizes:["large","large","large"]},
// {positions:[{x:4.08,y:4.125},{x:3.07,y:4.12},{x:4.08,y:3.81}],
// rotations:[Math.PI, Math.PI, Math.PI],
// ids:[0,1,2],
// colours:["green","blue","red"],
// sizes:["large","large","large"]}
// ];
