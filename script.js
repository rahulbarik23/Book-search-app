let searchdataform = document.getElementById("searchdataform")
let searchinput = document.getElementById("search")
let inputresults = document.getElementById("inputresults")

// ------------------------------------------get data from json----------------------------------------------------------

searchdataform.addEventListener("submit", (e) =>
{
    e.preventDefault();
    
    let searchquery = searchinput.value;

    const searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]")

    if(searchinput.value === "")
    {
        console.log("No searches to be added");
    }
    else
    {
        const searchrecord =
        {
            query: searchquery,
            datentime: new Date().toISOString()
        }

        searchHistory.unshift(searchrecord)
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    }
    
    // ----------------------------------------------------fetch data from json------------------------------------------

    inputresults.innerHTML = ``

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchquery}`)
    .then((response) => response.json())
    .then((data) =>
    {
        
        let booksdata = data.items;
        
        console.log(booksdata);
        if(searchinput.value === "")
        {
            console.log("empty");
            inputresults.innerHTML = "<h2> Search Field is EMPTY! </h2>"
        }
        else if(data.totalItems === 0)
        {
            inputresults.innerHTML = "<h2> OOPS! Your search returned no results. </h2>"
        }
        else
        {
            booksdata.map((book) =>
            {
                console.log(book);
                inputresults.innerHTML +=
                `
                <div class="item">
                    <div class="img-cont">
                        <img src="${book.volumeInfo.imageLinks.thumbnail}">
                    </div>
                    <div> Title: ${book.volumeInfo.title} </div>
                    <div> Author: ${book.volumeInfo.authors} </div>
                    <div> Page Count: ${book.volumeInfo.pageCount} </div>
                    <div> Publisher: ${book.volumeInfo.publisher} </div>
                    <section class="buynow"> <a href="${book.volumeInfo.infoLink}" target="_blank"> Buy Now </a> </section>
                </div> 
                `
            })
        } 
    })
})