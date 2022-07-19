function card(num, className , index) {
    n1 = ((num - 1) % 13) + 1
    suit = parseInt((num - 1) / 13)
    switch (n1) {
        case 11:
            this.n = 'J'
            break;
        case 12:
            this.n = 'Q'
            break;
        case 13:
            this.n = 'K'
            break;
        case 1:
            this.n = 'A'
            break;
        default:
            this.n = n1
            break;
    }
    switch (suit) {
        case 0:
            this.s = 'Spades'
            break;
        case 1:
            this.s = 'Hearts'
            break;
        case 2:
            this.s = 'Clubs'
            break;
        case 3:
            this.s = 'Diamonds'
            break;
    }
    let el = document.createElement('div')
    el.classList.add('card')
    el.innerHTML = "<div><img src='img/" + this.s + ".svg'> <span>" + this.n + "<img src='img/" + this.s + ".svg'></span> <span>" + this.n + "<img src='img/" + this.s + ".svg'></span></div><img src='img/p.webp'></img>"
    if (suit % 2) { el.style.color = 'red' } else { el.style.color = 'black' }
    document.getElementsByClassName(className)[index].append(el)
    this.show = function () {
        el.classList.add('show')
        el.classList.remove('hide')
        el.classList.remove('deal')
    }
    this.hide = function () {
        el.classList.remove('show')
        el.classList.add('hide')
        el.classList.remove('deal')
    }
    this.hide2 = function(){
        el.classList.add('deal')
    }
    // this.show()
    // this.hide()
    this.hide2()
}
