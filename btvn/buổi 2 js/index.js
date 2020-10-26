//https://pokeapi.co/api/v2/pokemon/1
const pokeNameEl = document.getElementsByClassName('poke-name')[0]
const pokePicEl = document.getElementsByClassName('poke-pic')[0]
const pokeCollection = document.getElementById('poke-collection')
let selectedPokemon = undefined
const getAndRenderPokeSelectedInfo = async (num) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
    selectedPokemon = await response.json()
    console.log(selectedPokemon)
    document.querySelector(".poke-selected").innerHTML += `<div class="poke-name">${selectedPokemon.name}</div>
    <img src="${selectedPokemon.sprites.front_default}" alt="" class="poke-pic">`
    // pokeCollection.innerHTML +=
    //     `<div class="poke-info">
    //       <div class="poke-name">${pokeData.name}</div>
    //       <img src="${pokeData.sprites.front_default}" alt="" class="poke-pic">
    //       <button class ="btn" onClick="deletePokeId(${num})"> X <button>
    //  </div>`
    // document
    // pokeNameEl.innerText = pokeData.name
    // pokePicEl.src = pokeData.sprites.front_default
    // const pokemonIds = localStorage.getItem('pokeIds') ? JSON.parse(localStorage.getItem('pokeIds')) : '[]'
    // localStorage.setItem('pokeIds',JSON.stringify(pokemonIds))
}
let addButtonArr = document.querySelectorAll(".add-pokemon-to-deck")
for (let i = 0; i < addButtonArr.length; i++) {
    addButtonArr[i].addEventListener("click", () => {
        let pokeIds = getPokeDeckIdInLocalStorage(i + 1)
        console.log(pokeIds)
        pokeIds.push(selectedPokemon.id)
        localStorage.setItem(`pokeIdsDeck${i + 1}`, JSON.stringify(pokeIds))
        console.log(addButtonArr[i].parentNode.nextElementSibling)
        addButtonArr[i].parentNode.nextElementSibling.innerHTML += `
            <div class="poke-info">
                   <div class="poke-name">${selectedPokemon.name}</div>
                   <img src="${selectedPokemon.sprites.front_default}" alt="" class="poke-pic">
                   <button class ="btn" onclick = "deletePokeInDeckId(${selectedPokemon.id})"> X </button>
            </div>`
    })
}
const getPokeDeckIdInLocalStorage = (id) => {
    return pokeIds = (JSON.parse(localStorage.getItem(`pokeIdsDeck${id}`)) || [])
}

const deletePokeInDeckId = (id) => {
    let pokemonNeedToDelete = event.target.parentNode
    let deckNumber = pokemonNeedToDelete.parentNode.classList[1].split("-")[1]
    pokemonNeedToDelete.parentNode.removeChild(pokemonNeedToDelete)
    console.log(deckNumber)
    let pokeIds = getPokeDeckIdInLocalStorage(deckNumber)
    console.log(pokeIds)
    pokeIds.splice(pokeIds.indexOf(id),1)
    console.log(pokeIds)
    localStorage.setItem(`pokeIdsDeck${deckNumber}`, JSON.stringify(pokeIds))
    renderDecksPokes()
    // const pokeIds = getPokeIdInLocalStorage();
    // const deleteIndex = pokeIds.indexOf(id)
    // pokeIds.splice(deleteIndex, 1)
    // console.log(pokeIds)
    // localStorage.setItem("pokeIds", JSON.stringify(pokeIds))
    // renderPokes()
}
const renderDecksPokes = async () => {
    for (let i = 1; i < 3; i++) {
        document.querySelector(`.deck-${i}`).innerHTML = ''
        const pokeIds = getPokeDeckIdInLocalStorage(i)
        for (let j = 0; j < pokeIds.length; j++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeIds[j]}`)
            const pokeData = await response.json()
            document.querySelector(`.deck-${i}`).innerHTML += `<div class="poke-info">
            <div class="poke-name">${pokeData.name}</div>
            <img src="${pokeData.sprites.front_default}" alt="" class="poke-pic">
            <button class ="btn" onclick = "deletePokeInDeckId(${pokeData.id})"> X </button>
         </div>`
        }
        // delete pokemon
        let deleteButtonArr = document.querySelectorAll(".btn")
        console.log(deleteButtonArr)
        for (let i = 0; i < deleteButtonArr.length; i++) {
            deleteButtonArr[i].addEventListener("click", (e) => {
                let clickedEl = e.target.parentNode
                console.log(clickedEl)
            })
        }
    }

}
renderDecksPokes()
// Find pokemon 
document.getElementById('search-form').addEventListener("submit", (e) => {
    e.preventDefault()
    document.querySelector(".poke-selected").innerHTML = ""
    document.querySelector(".poke-selected").style.display = "flex"
    let num = parseInt(document.getElementById('input').value)
    getAndRenderPokeSelectedInfo(num)
    // let pokeIds = getPokeIdInLocalStorage()
    // pokeIds.push(num)
    // pokeIds = [... new Set(pokeIds)]
    // renderPokes()
})
// S// console.log(localStorage.getItem('pokeIds'))
// stringify and parse in getItem and setItem of localStorage
// const arr = [1, 2, 3, { id: 'hello' }]
// console.log(JSON.stringify(arr))
// const arrStr = '[1,2,3,{"id":"hello"}]'
// console.log(JSON.parse(arrStr))

//Hoisting 
// console.log(a,b)
// let a = 5
// const b = 5  
// => bug 
// var + function : Đấy khai báo lên trên 

//ES6 
//REST / SPREAD OPERATION 
// const arr =[1,2,3,4] 
// const newArr =[... arr ,5 ,6]
// console.log(newArr)

// const person = {
//     name : "Thanh",
//     age : 19,
// }
// const extPerson = {
//     ... person,
//     school :'none',
// }
// console.log(extPerson)

// ARRAY FUNCTION
// forEach((item) => {})
//  data.map((item) => {
//      return 
//  }) 
// filter((item) => {
//return 1 giá trị thỏa mãn điều kiện 
// })
// reduce ((prev,curent) => {
// return 

// })
// const sum = [1,2,3,4].reduce((prev,current)=>{
//     return prev + current
// })
// console.log(sum )

//TOAN TU BA NGOI 
// const a = 5;
// const b = a< 6 ?4:3 

// const x = undefined
// const value = x || 5 

//DIEU KIEN CHAY HAM 
// console.log(value)
// const logX = () => {
//     console.log('logged')
// }
//  x && logX()

// DESTRUCTER 
// const obj = {
//     name: 'Thanh',
//     age : 19,
//     address: {
//         road : "Nguyen Chi Thanh",
//         no : 110,
//     }
// }
// const getObject = (o) => {
//     const {name,age}
//     console.log(name)
//     console.log(age)
// }

