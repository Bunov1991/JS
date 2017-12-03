function renderLocation(locationDiv,location) {
    let locationName=$('<h1 class="location-name">Location: '+location['name']+'</h1>');
    let locatinCoordinates=$('<div class="location-coordinates">')
        .append('<h2 class="location-longitude">Longitude: '+location['longitude']+'</h2>')
        .append('<h2 class="location-latitude">Latitude: '+location['latitude']+'</h2>');
    locationDiv.append(locationName);
    locationDiv.append(locatinCoordinates);
}

function renderPokemons(pokemonsDiv,pokemons) {
    if(!pokemons){
        return;
    }
    for(let index in pokemons){
        let pokemon=pokemons[index];

        let pokemonDiv=$('<div class="pokemon">');
        let pokemonTitle=$('<div class="pokemon-title">'+pokemon['name']+'</div>');
        let pokemonStatsDiv=$('<div class="pokemon-stats">')
            .append('<div class="pokemon-name">Name:'+pokemon['name']+'</div>')
            .append('<div class="pokemon-power">Power:'+pokemon['power']+'</div>')
            .append('<div class="pokemon-evolved-from">Evolved From:'+pokemon['evolvedFrom']+'</div>')
            .append('<div class="pokemon-evolves-to">Evolved To:'+pokemon['evolvesTo']+'</div>');


        pokemonDiv
            .append(pokemonTitle)
            .append(pokemonStatsDiv);

        pokemonsDiv.append(pokemonDiv);
    }

}
//Problem 4
function attachFormEvents() {
    $('.location-form>button').click(function (e) {
        e.preventDefault();

        let inputValue=$('.location-input').val();

        if(inputValue.length > 0){
            obtainData(inputValue);
        }// when is 0 - didn't work

        $('.location-input').val('');
    });
}

function obtainData(location) {
    $.get('https://pokemoncodex.firebaseio.com/locations/'+location+'.json')
        .then(renderLocationData)
        .catch((error)=>console.log('error'))
}
function renderLocationData(location) {
    $('.result').empty();
    $('.result').show();
    if(!location){
        $('.result').append('<div class="error">Error loading location.</div>');
        return;
    }
    let locationDiv=$('<div class="location">');
    let pokemonsDiv=$('<div class="pokemons">');

    renderLocation(locationDiv,location);
    renderPokemons(pokemonsDiv,location['pokemons']);

    $('.result')
        .append(locationDiv)
        .append(pokemonsDiv);
    accordion();
}
function accordion() {
    $('.pokemon-title').click(function(e){
        e.preventDefault();

        var $this=$(this);

        if($this.next().hasClass('show')){
            $this.next().removeClass('show');
            $this.next().slideUp(350);
        }else {
            $this.parent().parent().find('.pokemon-stats').removeClass('show');
            $this.parent().parent().find('.pokemon-stats').slideUp(350);
            $this.next().toggleClass('show');
            $this.next().slideToggle(350);
        }
    });
}
attachFormEvents();