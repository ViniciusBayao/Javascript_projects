const colors = ["green", "blue", "red"];
i = 0;

//console.log(colors);
document.getElementById("myBtn1").addEventListener("click", function myFunction(){
    if(i <= 2){
        document.body.style.backgroundColor = colors[i];
        i += 1;
    }else if(i >= 2){
        i = 0;
        document.body.style.backgroundColor = colors[i];
        i += 1;
    }
});

document.getElementById("myBtn2").addEventListener("click", function myFunction2(){
    document.body.style.backgroundColor = "white";
});

/* const colors = ["green", "blue", "red"];
i = 0;

console.log(colors);
document.getElementById("myBtn1").addEventListener("click", function myFunction(){
    if(i <= 2){
        document.body.style.backgroundColor = colors[i];
        i += 1;
    }else if(i >= 2){
        i = 0;
        document.body.style.backgroundColor = colors[i];
        i += 1;
    }
}); */
