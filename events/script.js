// // listing vars here so they're in the global scope
// var cards, nCards, cover, openContent, openContentText, pageIsOpen = false,
//     openContentImage, closeContent, windowWidth, windowHeight, currentCard;
//
// // initiate the process
// init();
//
// function init() {
//   resize();
//   selectElements();
//   attachListeners();
// }
//
// // select all the elements in the DOM that are going to be used
// function selectElements() {
//   cards = document.getElementsByClassName('card'),
//   nCards = cards.length,
//   cover = document.getElementById('cover'),
//   openContent = document.getElementById('open-content'),
//   openContentText = document.getElementById('open-content-text'),
//   openContentImage = document.getElementById('open-content-image')
//   closeContent = document.getElementById('close-content');
// }
//
// /* Attaching three event listeners here:
//   - a click event listener for each card
//   - a click event listener to the close button
//   - a resize event listener on the window
// */
// function attachListeners() {
//   for (var i = 0; i < nCards; i++) {
//     attachListenerToCard(i);
//   }
//   closeContent.addEventListener('click', onCloseClick);
//   window.addEventListener('resize', resize);
// }
//
// function attachListenerToCard(i) {
//   cards[i].addEventListener('click', function(e) {
//     var card = getCardElement(e.target);
//     onCardClick(card, i);
//   })
// }
//
// /* When a card is clicked */
// function onCardClick(card, i) {
//   // set the current card
//   currentCard = card;
//   // add the 'clicked' class to the card, so it animates out
//   currentCard.className += ' clicked';
//   // animate the card 'cover' after a 500ms delay
//   setTimeout(function() {animateCoverUp(currentCard)}, 500);
//   // animate out the other cards
//   animateOtherCards(currentCard, true);
//   // add the open class to the page content
//   openContent.className += ' open';
// }
//
// /*
// * This effect is created by taking a separate 'cover' div, placing
// * it in the same position as the clicked card, and animating it to
// * become the background of the opened 'page'.
// * It looks like the card itself is animating in to the background,
// * but doing it this way is more performant (because the cover div is
// * absolutely positioned and has no children), and there's just less
// * having to deal with z-index and other elements in the card
// */
// function animateCoverUp(card) {
//   // get the position of the clicked card
//   var cardPosition = card.getBoundingClientRect();
//   // get the style of the clicked card
//   var cardStyle = getComputedStyle(card);
//   setCoverPosition(cardPosition);
//   setCoverColor(cardStyle);
//   scaleCoverToFillWindow(cardPosition);
//   // update the content of the opened page
//   openContentText.innerHTML = '<h1>'+card.children[2].textContent+'</h1>'+paragraphText;
//   openContentImage.src = card.children[1].src;
//   setTimeout(function() {
//     // update the scroll position to 0 (so it is at the top of the 'opened' page)
//     window.scroll(0, 0);
//     // set page to open
//     pageIsOpen = true;
//   }, 300);
// }
//
// function animateCoverBack(card) {
//   var cardPosition = card.getBoundingClientRect();
//   // the original card may be in a different position, because of scrolling, so the cover position needs to be reset before scaling back down
//   setCoverPosition(cardPosition);
//   scaleCoverToFillWindow(cardPosition);
//   // animate scale back to the card size and position
//   cover.style.transform = 'scaleX('+1+') scaleY('+1+') translate3d('+(0)+'px, '+(0)+'px, 0px)';
//   setTimeout(function() {
//     // set content back to empty
//     openContentText.innerHTML = '';
//     openContentImage.src = '';
//     // style the cover to 0x0 so it is hidden
//     cover.style.width = '0px';
//     cover.style.height = '0px';
//     pageIsOpen = false;
//     // remove the clicked class so the card animates back in
//     currentCard.className = currentCard.className.replace(' clicked', '');
//   }, 301);
// }
//
// function setCoverPosition(cardPosition) {
//   // style the cover so it is in exactly the same position as the card
//   cover.style.left = cardPosition.left + 'px';
//   cover.style.top = cardPosition.top + 'px';
//   cover.style.width = cardPosition.width + 'px';
//   cover.style.height = cardPosition.height + 'px';
// }
//
// function setCoverColor(cardStyle) {
//   // style the cover to be the same color as the card
//   cover.style.backgroundColor = cardStyle.backgroundColor;
// }
//
// function scaleCoverToFillWindow(cardPosition) {
//   // calculate the scale and position for the card to fill the page,
//   var scaleX = windowWidth / cardPosition.width;
//   var scaleY = windowHeight / cardPosition.height;
//   var offsetX = (windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
//   var offsetY = (windowHeight / 2 - cardPosition.height / 2 - cardPosition.top) / scaleY;
//   // set the transform on the cover - it will animate because of the transition set on it in the CSS
//   cover.style.transform = 'scaleX('+scaleX+') scaleY('+scaleY+') translate3d('+(offsetX)+'px, '+(offsetY)+'px, 0px)';
// }
//
// /* When the close is clicked */
// function onCloseClick() {
//   // remove the open class so the page content animates out
//   openContent.className = openContent.className.replace(' open', '');
//   // animate the cover back to the original position card and size
//   animateCoverBack(currentCard);
//   // animate in other cards
//   animateOtherCards(currentCard, false);
// }
//
// function animateOtherCards(card, out) {
//   var delay = 100;
//   for (var i = 0; i < nCards; i++) {
//     // animate cards on a stagger, 1 each 100ms
//     if (cards[i] === card) continue;
//     if (out) animateOutCard(cards[i], delay);
//     else animateInCard(cards[i], delay);
//     delay += 100;
//   }
// }
//
// // animations on individual cards (by adding/removing card names)
// function animateOutCard(card, delay) {
//   setTimeout(function() {
//     card.className += ' out';
//    }, delay);
// }
//
// function animateInCard(card, delay) {
//   setTimeout(function() {
//     card.className = card.className.replace(' out', '');
//   }, delay);
// }
//
// // this function searches up the DOM tree until it reaches the card element that has been clicked
// function getCardElement(el) {
//   if (el.className.indexOf('card ') > -1) return el;
//   else return getCardElement(el.parentElement);
// }
//
// // resize function - records the window width and height
// function resize() {
//   if (pageIsOpen) {
//     // update position of cover
//     var cardPosition = currentCard.getBoundingClientRect();
//     setCoverPosition(cardPosition);
//     scaleCoverToFillWindow(cardPosition);
//   }
//   windowWidth = window.innerWidth;
//   windowHeight = window.innerHeight;
// }
//
// var paragraphText = '<p>Somebody once told me the world is gonna roll me. I ain\'t the sharpest tool in the shed. She was looking kind of dumb with her finger and her thumb in the shape of an "L" on her forehead. Well the years start coming and they don\'t stop coming. Fed to the rules and I hit the ground running. Didn\'t make sense not to live for fun. Your brain gets smart but your head gets dumb. So much to do, so much to see. So what\'s wrong with taking the back streets? You\'ll never know if you don\'t go. You\'ll never shine if you don\'t glow.</p><p>Hey now, you\'re an all-star, get your game on, go play. Hey now, you\'re a rock star, get the show on, get paid. And all that glitters is gold. Only shooting stars break the mold.</p><p>It\'s a cool place and they say it gets colder. You\'re bundled up now, wait till you get older. But the meteor men beg to differ. Judging by the hole in the satellite picture. The ice we skate is getting pretty thin. The water\'s getting warm so you might as well swim. My world\'s on fire, how about yours? That\'s the way I like it and I never get bored.</p>';
// $('.elixirHead').onmouseover().css("display","block");
var elixirCounter = 0;
var electrifyCounter = 0;
var specialCounter = 0;

$(document).ready(function(){
    $('.robo-official-slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.robo-official-slider-nav'
      });
      $('.robo-official-slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.robo-official-slider-for',
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true
      });
      $('.design-build-slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.design-build-slider-nav'
      });
      $('.design-build-slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.design-build-slider-for',
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true
      });
    $("#quark-national-quiz").on("click", function(){
        $("#card-text-elixir").text("Quark National Quiz");
        $("#card-image-elixir").attr("src", "images/qnq.jpg");
    });
    $("#ganimatooonics").on("click", function(){
        $("#card-text-elixir").text("Ganimatooonics");
        $("#card-image-elixir").attr("src", "images/ganimatooonics.jpg");
    });

    $("#digilogica").on("click", function(){
        $("#card-text-electrify").text("Digilogica");
        $("#card-image-electrify").attr("src", "images/digilogica.gif");
    });

    $("#μcmania").on("click", function(){
        $("#card-text-electrify").text("μC Mania");
        $("#card-image-electrify").attr("src", "images/ucmania.jpg");
    });

    $("#openshowcase").on("click", function(){
        $("#card-text-special").text("Open Showcase");
        $("#card-image-special").attr("src", "images/openshowcase.jpg");
    });

    $("#paperpresentation").on("click", function(){
        $("#card-text-special").text("Paper Presentation");
        $("#card-image-special").attr("src", "images/paperpresentation.jpg");
    });

    $("#schoolbag").on("click", function(){
        $("#card-text-special").text("School Bag");
        $("#card-image-special").attr("src", "images/schoolbag.jpg");
    });
    setInterval(elixirHandler, 5000);
    setInterval(electrifyHandler, 5000);
    setInterval(specialsHandler, 5000);
})

function elixirHandler(){
    if(elixirCounter===0){
        $("#card-text-elixir").text("Quark National Quiz");
        $("#card-image-elixir").attr("src", "images/qnq.jpg");
        elixirCounter=1;
    }
    else{
        $("#card-text-elixir").text("Ganimatooonics");
        $("#card-image-elixir").attr("src", "images/ganimatooonics.jpg");
        elixirCounter=0;
    }
}

function electrifyHandler(){
    if(electrifyCounter===0){
        $("#card-text-electrify").text("Digilogica");
        $("#card-image-electrify").attr("src", "images/digilogica.gif");
        electrifyCounter=1;
    }
    else{
        $("#card-text-electrify").text("μC Mania");
        $("#card-image-electrify").attr("src", "images/ucmania.jpg");
        electrifyCounter=0;
    }
}

function specialsHandler(){
    if(specialCounter===0){
        $("#card-text-special").text("Open Showcase");
        $("#card-image-special").attr("src", "images/openshowcase.jpg");
        specialCounter=1;
    }
    else{
        if(specialCounter===1){
            $("#card-text-special").text("Paper Presentation");
            $("#card-image-special").attr("src", "images/paperpresentation.jpg");
            specialCounter=2;
        }else{
            $("#card-text-special").text("School Bag");
            $("#card-image-special").attr("src", "images/schoolbag.jpg");
            specialCounter=0;
        }
    }
}