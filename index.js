const map = document.querySelector("svg")
const path = map.querySelectorAll("path")
const tooltip = document.querySelector('.tooltip')
const countries = []
let mapWidth = window.innerWidth

path.forEach((element) => {
    //country with only one territory
    if (element.getAttribute("name")) {
        element.dataset.countryName = element.getAttribute("name")
    }

    //country with more then one teritory
    else {
        element.dataset.countryName = element.classList
    }

    countries.push(element)
})

countries.forEach((element) => {
    element.addEventListener("mouseover", (e) => {

        window.onmousemove = (e) => {
            x = e.clientX
            y = e.clientY

            tooltip.style.top = y-60+"px"
            tooltip.style.left = x+"px"
        }
        tooltip.innerHTML = "<span>"+element.dataset.countryName+"</span>"
        tooltip.classList.add('show')
    })

    element.addEventListener("mouseout", (e) => {
        tooltip.classList.remove('show')
    })
})

const btnPlus = document.querySelector(".btn-zoom-plus")
const btnMinus = document.querySelector(".btn-zoom-minus")

btnPlus.addEventListener("click", () => {
    mapWidth = mapWidth + 100
    if (mapWidth > 5000) return
    map.style.width = mapWidth + "px"
})

btnMinus.addEventListener("click", () => {
    mapWidth = mapWidth - 100
    if (mapWidth < 400) return
    map.style.width = mapWidth + "px"
})


const container = document.querySelector('.scroll');

let startY;
let startX;
let scrollLeft;
let scrollTop;
let isDown;

container.addEventListener('mousedown',e => mouseIsDown(e));
container.addEventListener('mouseup',e => mouseUp(e))
container.addEventListener('mouseleave',e=>mouseLeave(e));
container.addEventListener('mousemove',e=>mouseMove(e));

function mouseIsDown(e){
    container.style.cursor = "all-scroll"
    isDown = true;
    startY = e.pageY - container.offsetTop;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
}
function mouseUp(e){
    isDown = false;
    container.style.cursor = "auto"
}
function mouseLeave(e){
    isDown = false;
}
function mouseMove(e){
    if(isDown){
        e.preventDefault();
        //Move vertcally
        const y = e.pageY - container.offsetTop;
        const walkY = y - startY;
        container.scrollTop = scrollTop - walkY;

        //Move Horizontally
        const x = e.pageX - container.offsetLeft;
        const walkX = x - startX;
        container.scrollLeft = scrollLeft - walkX;
    }
}