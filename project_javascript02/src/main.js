import api from './api';

class App{
    //Constructor method
    constructor(){
        // Repo list
        this.repositories = [];

        // Formulary
        this.formulary = document.querySelector('form');

        // Recover List
        this.lst = document.querySelector('.list-group');

        // Method to register the events of form
        this.registerEvents();
    }

    registerEvents(){
        this.formulary.onsubmit = occurrence => this.addRepository(occurrence);

    }

    async addRepository(occurrence){
        // Prevents the form from reloading the page
        occurrence.preventDefault();

        // Recover input value
        let input = this.formulary.querySelector('input[id=repository]').value;

        // If input comes empty, break and exit the application.
        if(input.length === 0){
            return; // Return always exits the function.
        }

        // Activate the loading
        this.displaySearching();

        try{

            let response = await api.get(`/repos/${input}`);

            // console.log(response);

            // Destructuring concept
            let { name, description, html_url, owner: {avatar_url } } = response.data;

            // Add the repository to the list
            this.repositories.push({
                name,
                description,
                avatar_url,
                link: html_url,

            });

            // Render the screen
            this.renderScreen();

        }catch(error){
            // Clean Searching
            this.lst.removeChild(document.querySelector('.list-group-item-warning'));

            // Clear existing error
            let er = this.lst.querySelector('.list-group-item-danger');
            if(er !== null){
                this.lst.removeChild(er);
            }
            //<li>
            let li = document.createElement('li');
            li.setAttribute('class', 'list-group-item list-group-item-danger');
            let txtError = document.createTextNode(`The repository ${input} does not exist.`);
            li.appendChild(txtError);
            this.lst.appendChild(li);

        }   
    }

    displaySearching(){
         //<li>
         let li = document.createElement('li');
         li.setAttribute('class', 'list-group-item list-group-item-warning');
         let txtSearching = document.createTextNode(`One moment, Searching the repository...`);
         li.appendChild(txtSearching);
         this.lst.appendChild(li);

    }

    renderScreen(){
        // Clean the content of lst
        this.lst.innerHTML = '';

        //Go through the entire list of repositories and create the elements
        this.repositories.forEach(repository => {

            //<li>
            let li = document.createElement('li');
            li.setAttribute('class', 'list-group-item list-group-item-action');

            //<img> 
            let img = document.createElement('img');
            img.setAttribute('src', repository.avatar_url);
            li.appendChild(img);

            //<strong>
            let strong = document.createElement('strong');
            let txtName = document.createTextNode(repository.name);
            strong.appendChild(txtName);
            li.appendChild(strong);

            //<p>
            let p = document.createElement('p');
            let txtDescription = document.createTextNode(repository.description);
            p.appendChild(txtDescription);
            li.appendChild(p);

            //<a>
            let a = document.createElement('a');
            a.setAttribute('target', '_blank');
            a.setAttribute('href', repository.link);
            let txtA = document.createTextNode('Access');
            a.appendChild(txtA);
            li.appendChild(a);

            // Add <li> as child of <ul>
            this.lst.appendChild(li);

            li.onclick = function(){

                removeItem(this)
            }

            // Clean the content of input
            this.formulary.querySelector('input[id=repository]').value = '';

            //Add the focus on input
            this.formulary.querySelector('input[id=repository]').focus();

        });
    }

    mybd()
    {
        localStorage.setItem('repository', JSON.stringify(this.repositories))
    }

    }

    let a = new App();

function removeItem(item){
    a.repositories.splice(a.repositories.indexOf(item.textContent), 1)
    a.lst.removeChild(item)
    a.mybd();
}
