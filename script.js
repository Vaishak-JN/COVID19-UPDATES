fetch("https://covid-api.mmediagroup.fr/v1/cases")
.then(res=>res.json())
.then(data=>{
    console.log(data)
    // for pagination
    const rows=20;
    // set page value
    let page=0;
    // total btns required
    const totalbtns=Math.ceil(Object.keys(data).length/rows)
    // 10 btns
    console.log(totalbtns)
    // console.log(Object.keys(data))

    // select the 5 buttons
    let btn1=document.querySelector(".btn1")
    let btn2=document.querySelector(".btn2")
    let btn3=document.querySelector(".btn3")
    let btn4=document.querySelector(".btn4")
    let btn5=document.querySelector(".btn5")

    // get values of the keys in array form
    let arr=Object.keys(data);
    // console.log(arr)

    // first btn
    let first=document.querySelector(".first");
    first.addEventListener("click",()=>{
        if(page==1){
            alert("You are on the first page")
        }else{
            // display button values
            btn1.innerText="1";
            btn2.innerText="2";
            btn3.innerText="3";
            btn4.innerText="4";
            btn5.innerText="5";
            // set page value
            page=1;
        }
        // call function to display the fetched data corresponding to the current page
        content(data,arr,page,rows)
        btn1.focus()
        console.log(page)
    })

    // for prev btn
    let prev=document.querySelector(".prev");
    prev.addEventListener("click",()=>{
        if((btn1.innerText==1) && !(page==1)){
            page=page-1
        }else if(!(btn1.innerText==1)){    
            btn1.innerText=parseInt(btn1.innerText)-1;
            btn2.innerText=parseInt(btn2.innerText)-1;
            btn3.innerText=parseInt(btn3.innerText)-1;
            btn4.innerText=parseInt(btn4.innerText)-1;
            btn5.innerText=parseInt(btn5.innerText)-1;
            page=page-1
        }else{
            alert("You are on the first page")
            page=1;
        }
        if(page>=1){
            // call function to display data
            content(data,arr,page,rows)
        }
        console.log(page)
            // to set focus
            if(btn1.innerText==page){
                btn1.focus()
            }else if(btn2.innerText==page){
                btn2.focus()
            }else if(btn3.innerText==page){
                btn3.focus()
            }else if(btn4.innerText==page){
                btn4.focus()
            }else{
                btn5.focus()
            }           
    })

    // for next button
    let next=document.querySelector(".next");
    next.addEventListener("click",()=>{
        if((btn5.innerText==totalbtns) && (page==totalbtns)){
            alert("This is the last page")
        }else if(!(btn5.innerText==totalbtns) && !(page==totalbtns)){
            btn1.innerText=parseInt(btn1.innerText)+1;
            btn2.innerText=parseInt(btn2.innerText)+1;
            btn3.innerText=parseInt(btn3.innerText)+1;
            btn4.innerText=parseInt(btn4.innerText)+1;
            btn5.innerText=parseInt(btn5.innerText)+1;
            page=page+1
        }else if((btn5.innerText==totalbtns) && !(page==totalbtns)){
            page=page+1
        }
        if(page<=20){
            // call the function to display data
            content(data,arr,page,rows)
        }
        console.log(page)
        // to set focus
        if(btn1.innerText==page){
            btn1.focus()
        }else if(btn2.innerText==page){
            btn2.focus()
        }else if(btn3.innerText==page){
            btn3.focus()
        }else if(btn4.innerText==page){
            btn4.focus()
        }else{
            btn5.focus()
        }
            
    })

    // last btn
    let last=document.querySelector(".last");
    last.addEventListener("click",()=>{
        if(page==totalbtns && btn5.innerText==totalbtns){
            page=totalbtns;
            btn5.focus()
            alert("You are on the last page")        
        }else{
            btn1.innerText=totalbtns-4;
            btn2.innerText=totalbtns-3;
            btn3.innerText=totalbtns-2;
            btn4.innerText=totalbtns-1;
            btn5.innerText=totalbtns;
            btn5.focus()
            page=totalbtns;    
        }
        // call function
        content(data,arr,page,rows)
        console.log(page)
    })
    // for all the other 5 buttons
    let btns=document.querySelectorAll(".btn");
    btns.forEach(btn=>{
        btn.addEventListener("click",()=>{        
            page=parseInt(btn.innerText);
            console.log(page);
            content(data,arr,page,rows)
            btn.focus()
        })
    })
    // function to display first set of data on page load
    function firstData(){ 
        btn1.innerText="1";
        btn2.innerText="2";
        btn3.innerText="3";
        btn4.innerText="4";
        btn5.innerText="5";
        page=1;
        // to dispaly data
        content(data,arr,page,rows)
        // btn1.focus()
        console.log(page)
    }
    window.onload=firstData()
    
    h1=document.querySelector("h1");
    h1.addEventListener("click",()=>{
        btn1.innerText="1";
        btn2.innerText="2";
        btn3.innerText="3";
        btn4.innerText="4";
        btn5.innerText="5";        
        page=1;
        content(data,arr,page,rows)
        btn1.focus()
    })
}).catch(err=>{
    console.log(err)
})
// funtion to display data corresponding to the page
function content(data,arr,page,rows){
    let container=document.querySelector(".container")
    container.innerHTML="";
    for (let i=page*rows-rows;i<page*rows;i++){
        let name=arr[i]
        let div=document.createElement("div");
        div.setAttribute("class","card")
        let country=document.createElement("h2");
        country.setAttribute("class","country")
        let confirmed=document.createElement("p");
        confirmed.setAttribute("class","confirmed");
        let deaths=document.createElement("p");
        deaths.setAttribute("class","deaths");
        let lifeExp=document.createElement("p");
        lifeExp.setAttribute("class","lifeExp")
        let population=document.createElement("p");
        population.setAttribute("class","population")
        let updated=document.createElement("p");
        updated.setAttribute("class","updated")
        country.innerText=`${data[name].All.country}`;
        population.innerHTML=`Population: <span>${data[name].All.population}</span>`;
        confirmed.innerHTML=`Confirmed Cases: <span>${data[name].All.confirmed}</span>`;
        deaths.innerHTML=`Deaths: <span>${data[name].All.deaths}</span>`;
        lifeExp.innerHTML=`Life-Expectency: <span>${data[name].All.life_expectancy}%</span>`
        updated.innerHTML=`Updated: <span>${data[name].All.updated.split(" ")[0]}</span>`
        div.appendChild(country)
        div.appendChild(population)
        div.appendChild(confirmed)
        div.appendChild(deaths)
        div.appendChild(lifeExp)
        div.appendChild(updated)
        container.append(div);
    }
}
