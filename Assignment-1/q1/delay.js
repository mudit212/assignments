function setTimeout(myfunc,n)
{
    var d=new Date();
    while(new Date-d<n)
    {

    }

  myfunc();
}

function myfunc(d,n)
{
    console.log('saurabh');
}


setTimeout(myfunc,500);
console.log('Hello');


