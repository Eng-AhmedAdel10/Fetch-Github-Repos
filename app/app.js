// setup 
const theInput=document.getElementById("theInput");
const getReposBtn=document.getElementById("getReposBtn");
const dataContainer=document.querySelector(".dataContainer");
messageTellNoData=document.querySelector(".messageTellNoData");
result=document.querySelector(".result");

// function onload
window.onload=()=>{
    theInput.focus();
}

// function click on btn
getReposBtn.addEventListener("click",()=>{
    if(theInput.value=="")
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Enter Username',
          })
    }
    else
    {
        async function getData()
        {
            const data=await fetch(`https://api.github.com/users/${theInput.value}/repos`);
            const dataJson=await data.json();
            return dataJson;
        }
        getData().then(data=>{
            isertData(data)
    })
    }
});

// function isertData
function isertData(data)
{
    if(data=="")
            {
                result.innerHTML="";
                result.innerHTML=`<p class="messageTellNoData">no data to show</p>`;
                theInput.value="";
                messageTellNoData.style.display="block";
                theInput.focus();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'This Username Is Not defind',
                  });
            }
            else
            {
            result.innerHTML="";
            messageTellNoData.style.display="none";
            
            data.forEach(item=>{
                result.innerHTML+=`
                <div class="dataContainer">
            <span class="text">${item.name}</span>
                <div class="dataBtns">
                    <span class="stars">stars ${item.stargazers_count}</span>
                    <a href="https://github.com/${theInput.value}/${item.name}" target="_blank">visit</a>
                </div>
                <div>
            `
        });
        theInput.value="";
        theInput.focus();
    }
}







