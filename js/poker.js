let players = 3;
let sim2 = 0;
let iri = 0;
let c = [];
let c2 = [];
let hands = new Array(players);
let full = [];
let ply = [];
let jk = 0;
let pcard = [];
let gcard = [];
let pgc = 0;
_dealerSVG = `<svg width="200" height="200" viewBox="0 0 500 500"><circle id="circle" stroke-width="20%" stroke="#06004e" cx="50%" cy="50%" r="40%" fill="transparent" /><defs><path fill="gray" d="M25 250 a 225 225 1 1 0 450 0 a 225 225 1 0 0 -450 0" id="txt-path2"></path></defs><text style="letter-spacing: 7px" fill="#00e1ffdf" font-size="90" font-family="monospace" font-weight="600"><textPath startOffset="0" xlink:href="#txt-path2">  ------  DEALER  ------  DEALER</textPath></text></svg>`;

document.getElementById("input").defaultValue = players;
window.addEventListener("keyup", function (event) {
  if (event.key == "d") {
    arya();
  }
});
window.addEventListener("keyup", function (event) {
  if (event.key == "t") {
    arya();
    grounding();
    grounding();
    grounding();
    if (document.getElementById("test2").innerHTML == "Hide") {
      // console.log('show')
      pcard.flat().forEach((a) => {
        a.show();
      });
    }
  }
});
window.addEventListener("keyup", function (event) {
  if (event.key == "s") {
    simulator();
  }
});
document.getElementById("deal").addEventListener("click", function () {
  arya();
});
document.getElementById("test").addEventListener("click", function () {
  grounding();
});
document.getElementById("test1").addEventListener("click", function () {
  arya();
  grounding();
  grounding();
  grounding();
  if (document.getElementById("test2").innerHTML == "Hide") {
    pcard.flat().forEach((a) => {
      a.show();
    });
  }
});
document.getElementById("sim").addEventListener("click", function () {
  simulator();
});
document.getElementById("input").addEventListener("keyup", function () {
  for (pl = 0; pl < players; pl++) {
    delete ply[pl];
  }
  delete Rank;
  players = parseInt(document.getElementById("input").value);
});
document.getElementById("game").addEventListener("click", function () {
  _game();
});
document.getElementById("test2").addEventListener("click", function () {
  if (this.innerHTML == "Show") {
    console.log("show");
    pcard.flat().forEach((a) => {
      a.show();
    });
    this.innerHTML = "Hide";
  } else {
    pcard.flat().forEach((a) => {
      a.hide();
    });
    this.innerHTML = "Show";
  }
  // pgc++
});

function player(a) {
  this.hand = a;
  lii = 0;
  let sort = this.hand.slice().sort((a, b) => b - a);
  let sortnum = this.hand
    .slice()
    .map((a) => ((a - 1) % 13) + 1)
    .sort((a, b) => b - a);
  let colors = this.hand.slice().map((a) => Math.floor((a - 1) / 13));
  let sort2 = sortnum.slice();
  while (sort2.includes(1)) {
    sort2[sort2.indexOf(1)] = 14;
  }
  sort2.sort((a, b) => b - a);

  let isPair = function () {
    ii1 = 0;
    pair = 0;
    sort2.forEach(function (a, i, arr) {
      if (arr.slice().filter((h) => h == a).length == 2) {
        ii1++;
        pair = a;
      }
    });
    return [ii1 == 2, pair];
  };
  let isSet = function () {
    ii = 0;
    set = [];
    sort2.forEach(function (a, i, arr) {
      if (arr.slice().filter((h) => h == a).length == 3) {
        ii++;
        if (!(ii % 3)) {
          set.push(a);
        }
      }
    });
    if (set.length != 0) {
    }
    return [ii > 0, set];
  };
  let isFourOfAKind = function () {
    ii = 0;
    four = 0;
    sort2.forEach(function (a, i, arr) {
      if (arr.slice().filter((h) => h == a).length == 4) {
        ii++;
        four = a;
      }
    });
    return [ii > 0, four];
  };
  let is2pair = function () {
    ii2 = 0;
    _2pair = [];
    sort2.forEach(function (a, i, arr) {
      if (arr.slice().filter((h) => h == a).length == 2) {
        ii2++;
        if (ii2 % 2 && _2pair.length < 5) {
          _2pair.push(a);
        }
      }
    });
    return [ii2 == 4 || ii2 == 6, _2pair];
  };
  _pair = isPair();
  _twoPair = is2pair();
  _set = isSet();
  let isFull = function () {
    ii3 = 0;
    tempp = 0;
    full = [];
    if (
      (_pair[0] && _set[0]) ||
      (_twoPair[0] && _set[0]) ||
      (_set[0] && _set[1].length == 2)
    ) {
      ii3++;
      if (_pair[0] && _set[0]) {
        tempp = 1;
        full = [_set[1][0], _pair[1]];
      } else if (_twoPair[0] && _set[0]) {
        tempp = 2;
        full = [_set[1][0], _twoPair[1][0]];
      } else {
        full = [_set[1][0], _set[1][1]];
        tempp = 3;
      }
    }
    // console.log(tempp)
    return [ii3 > 0, full];
  };
  let isFlush = function () {
    ii = 0;
    flush = [];
    colors.forEach(function (a, i, arr) {
      if (arr.slice().filter((h) => h == a).length > 4) {
        ii++;
        flush = sort
          .slice()
          .filter((a2) => Math.floor((a2 - 1) / 13) == a)
          .map((a) => ((a - 1) % 13) + 1);
        flush[flush.indexOf(1)] = 14;
        flush.sort((a, b) => b - a);
      }
    });
    return [ii > 0, flush];
  };
  let isStraight = function () {
    ii = 0;
    strarr = [];
    x = [...new Set(sortnum)];
    for (str = 0; str < x.length - 4; str++) {
      if (
        x[str] == x[str + 1] + 1 &&
        x[str] == x[str + 2] + 2 &&
        x[str] == x[str + 3] + 3 &&
        x[str] == x[str + 4] + 4
      ) {
        ii++;
        strarr = [x[str], x[str + 1], x[str + 2], x[str + 3], x[str + 4]];
        break;
      }
      if (
        x[str] == 13 &&
        x[str + 1] == 12 &&
        x[str + 2] == 11 &&
        x[str + 3] == 10 &&
        x.includes(1)
      ) {
        strarr = [14, 13, 12, 11, 10];
        ii++;
        break;
      }
    }
    return [ii > 0, strarr];
  };
  let isStrF = function () {
    ii = 0;
    strarr = [];
    x = [...new Set(sort)];
    x2 = x.slice().map((a) => Math.floor((a - 1) / 13));
    for (str = 0; str < x.length - 4; str++) {
      if (
        x[str] == x[str + 1] + 1 &&
        x[str] == x[str + 2] + 2 &&
        x[str] == x[str + 3] + 3 &&
        x[str] == x[str + 4] + 4
      ) {
        if (
          x2[str] == x2[str + 1] &&
          x2[str] == x2[str + 2] &&
          x2[str] == x2[str + 3] &&
          x2[str] == x2[str + 4]
        ) {
          ii++;
          strarr = [x[str], x[str + 1], x[str + 2], x[str + 3], x[str + 4]];
        }
      }
      return [ii > 0, strarr];
    }
  };
  let isRoyal = function () {
    ii = 0;
    if (
      (sort.includes(1) &&
        sort.includes(10) &&
        sort.includes(11) &&
        sort.includes(12) &&
        sort.includes(13)) ||
      (sort.includes(14) &&
        sort.includes(23) &&
        sort.includes(24) &&
        sort.includes(25) &&
        sort.includes(26)) ||
      (sort.includes(27) &&
        sort.includes(36) &&
        sort.includes(37) &&
        sort.includes(38) &&
        sort.includes(39)) ||
      (sort.includes(40) &&
        sort.includes(49) &&
        sort.includes(50) &&
        sort.includes(51) &&
        sort.includes(52))
    ) {
      ii++;
    }
    return [ii > 0, [10, 11, 12, 13, 14]];
  };
  _straight = isStraight();
  _flush = isFlush();
  _full = isFull();
  _four = isFourOfAKind();
  _strf = isStrF();
  _royal = isRoyal();
  let isWhat = function () {
    t = "High Card";
    lii++;
    if (_pair[0]) {
      t = "Pair";
    }
    if (_twoPair[0]) {
      t = "Two pair";
    }
    if (_set[0]) {
      t = "Set";
    }
    if (_straight[0]) {
      t = "Straight";
    }
    if (_flush[0]) {
      t = "Flush";
    }
    if (_full[0]) {
      t = "Full House";
    }
    if (_four[0]) {
      t = "Four of a kind";
    }
    if (_strf[0]) {
      t = "Straight flush";
    }
    if (_royal[0]) {
      t = "Royal flush";
    }
    return t;
  };
  this.title = isWhat();
  ttt = this.title;
  let winner = function () {
    winn = 0;
    wn = [];
    ir = 0;
    switch (ttt) {
      case "Four of a kind":
        score = 7;
        winn = _four[1];
        wn = [winn, winn, winn, winn];
        break;
      case "High Card":
        score = 0;
        winn = sort2[0];
        wn = [...sort2];
        while (wn.length > 5) {
          wn.pop();
        }
        break;
      case "Pair":
        score = 1;
        winn = _pair[1];
        wn = [winn, winn];
        while (wn.length < 5) {
          if (sort2[ir] != winn) {
            wn.push(sort2[ir]);
          }
          ir++;
        }
        break;
      case "Two pair":
        score = 2;
        winn = _twoPair[1];
        wn = [winn[0], winn[0], winn[1], winn[1]];
        while (wn.length < 5) {
          if (sort2[ir] != winn[0] && sort2[ir] != winn[1]) {
            wn.push(sort2[ir]);
          }
          ir++;
        }
        break;
      case "Set":
        score = 3;
        winn = _set[1].flat();
        wn = [winn[0], winn[0], winn[0]];
        if (winn.length > 1) {
          wn.push(winn[1]).push(winn[1]);
        }
        while (wn.length < 5) {
          if (sort2[ir] != winn[0] && sort2[ir] != winn[1]) {
            wn.push(sort2[ir]);
          }
          ir++;
        }
        break;
      case "Full House":
        score = 6;
        winn = _full[1];
        wn = [winn[0], winn[0], winn[0], winn[1], winn[1]];
        break;
      case "Straight":
        score = 4;
        winn = _straight[1];
        wn = winn;
        break;
      case "Straight flush":
        score = 8;
        winn = _strf[1];
        wn = winn;
        break;
      case "Royal flush":
        score = 9;
        winn = _royal[1];
        wn = winn;
        break;
      case "Flush":
        score = 5;
        winn = _flush[1];
        wn = winn;
        while (wn.length > 5) {
          wn.pop();
        }
        break;
    }
    // console.log(ttt + ' of ' + winn)
    return [winn, wn, score];
  };
  winnerarr = winner();
  this.winnerhand = winnerarr[1];
  this.score = winnerarr[2];
}
function rank(a) {
  this.players = a.length;
  let score = [];
  for (i = 0; i < this.players; i++) {
    score[i] = {
      player: i,
      score: a[i].score,
      winnerhand: a[i].winnerhand,
    };
  }
  this.scoreCopy = score.slice();
  this.scoreCopy.sort((a, b) => b.score - a.score);
  for (i = 0; i < this.players - 1; i++) {
    for (j = i + 1; j < this.players; j++) {
      if (this.scoreCopy[i].score == this.scoreCopy[j].score) {
        for (k = 0; k < 5; k++) {
          if (
            this.scoreCopy[i].winnerhand[k] > this.scoreCopy[j].winnerhand[k]
          ) {
            break;
          } else if (
            this.scoreCopy[i].winnerhand[k] < this.scoreCopy[j].winnerhand[k]
          ) {
            temp = this.scoreCopy[i];
            this.scoreCopy[i] = this.scoreCopy[j];
            this.scoreCopy[j] = temp;
            break;
          }
        }
      }
    }
  }
  for (i = 0; i < this.players - 1; i++) {
    for (j = i + 1; j < this.players; j++) {
      if (this.scoreCopy[i].score == this.scoreCopy[j].score) {
        temp2 = 0;
        for (k = 0; k < 5; k++) {
          if (
            this.scoreCopy[i].winnerhand[k] > this.scoreCopy[j].winnerhand[k]
          ) {
            break;
          }
          if (
            this.scoreCopy[i].winnerhand[k] == this.scoreCopy[j].winnerhand[k]
          ) {
            temp2++;
          }
        }
        if (temp2 == 5) {
          this.scoreCopy[i].draw = true;
          this.scoreCopy[j].draw = true;
          this.scoreCopy[j].draw1 = true;
        }
      }
    }
  }
  for (i = 0; i < this.players; i++) {
    if (this.scoreCopy[i].draw1 != true) {
      this.scoreCopy[i].rank = i + 1;
    } else
      for (j = 0; j < i + 1; j++) {
        if (this.scoreCopy[i - j].draw1 != true) {
          this.scoreCopy[i].rank = i + 1 - j;
          break;
        }
      }
  }
}
function arya() {
  document.getElementById("test").disabled = false;
  document.getElementById("test2").disabled = false;
  document.getElementById("input").disabled = true;
  deal();
}
function resize() {
  document.querySelectorAll("#players>div").forEach((a) => {
    a.style.width = 10 + 10 / players + "%";
  });
  document.querySelectorAll("#players>div").forEach((a) => {
    a.style.minHeight =
      parseInt(
        window
          .getComputedStyle(document.getElementsByClassName("card")[0])
          .getPropertyValue("height")
      ) *
        1.2 +
      "px";
  });

  // document.querySelectorAll('.card').forEach((a) => {
  //     a.style.width = (window.getComputedStyle(document.getElementsByClassName('card')[0]).getPropertyValue('width'))
  // })

  document.querySelectorAll("#players>div>div:nth-of-type(3)").forEach((a) => {
    a.style.top =
      1.15 *
        parseInt(
          window
            .getComputedStyle(document.getElementsByClassName("card")[0])
            .getPropertyValue("height")
        ) +
      "px";
  });
}
function shuffle() {
  let cards = new Array(52);
  let flop = [];
  let turn = [];
  let river = [];
  let randomIndex;
  currentIndex = 52;
  let ground = new Array(5);
  for (shuf = 0; shuf < 52; shuf++) {
    cards[shuf] = shuf + 1;
  }
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [cards[currentIndex], cards[randomIndex]] = [
      cards[randomIndex],
      cards[currentIndex],
    ];
  }
  for (p = 0; p < players; p++) {
    hands[p] = [cards[p], cards[p + players]];
  }
  for (p = 0; p < 3; p++) {
    flop[p] = cards[p + 1 + players * 2];
  }
  turn = cards[players * 2 + 6];
  river = cards[players * 2 + 8];
  return [cards, hands, flop, turn, river];
}
function deal() {
  c = shuffle();
  for (b = 0; b < players; b++) {
    c2[b] = c[1][b];
  }
  document.getElementById("players").innerHTML = "";
  document.getElementById("ground").innerHTML = "";
  pcard = [];
  gcard = [];
  for (k = 0; k < players; k++) {
    document.getElementById("players").append(document.createElement("div"));
    document.querySelectorAll("#players>div")[k].classList.add("arya");
    pcard.push([
      new card(c[1][k][0], "arya", k),
      new card(c[1][k][1], "arya", k),
    ]);
    document
      .querySelectorAll("#players>div")
      [k].append(document.createElement("div"));
    document
      .querySelectorAll("#players>div")
      [k].childNodes[2].classList.add("check");
    document
      .querySelectorAll("#players>div")
      [k].append(document.createElement("span"));
    document
      .querySelectorAll("#players>div")
      [k].append(document.createElement("span"));
    document
      .querySelectorAll("#players>div")
      [k].append(document.createElement("span"));
  }
  gcard = [
    new card(c[2][0], "ground", 0),
    new card(c[2][1], "ground", 0),
    new card(c[2][2], "ground", 0),
    new card(c[3], "ground", 0),
    new card(c[4], "ground", 0),
  ];
  document.getElementById("test").innerHTML = "Flop";

  resize();
  jk = 1;
}
function grounding() {
  if (jk == 1) {
    document.getElementById("test").innerHTML = "Turn";
    for (b = 0; b < players; b++) {
      c2[b] = c2[b].concat(c[2].flat());
    }
    for (k = 0; k < 3; k++) {
      gcard[k].show();
    }
  }
  if (jk == 2) {
    document.getElementById("test").innerHTML = "River";
    for (b = 0; b < players; b++) {
      c2[b].push(c[3]);
    }
    gcard[3].show();
  }
  if (jk == 3) {
    document.getElementById("test").disabled = true;
    document.getElementById("input").disabled = false;
    for (b = 0; b < players; b++) {
      c2[b].push(c[4]);
    }
    gcard[4].show();
  }
  for (pl = 0; pl < players; pl++) {
    delete ply[pl];
    ply[pl] = new player(c2[pl]);
    document.getElementById("players").childNodes[pl].childNodes[2].innerHTML =
      ply[pl].title + "<br>" + ply[pl].winnerhand;
  }
  jk++;
  if (jk == 4) {
    Rank = new rank(ply);
    for (i = 0; i < players; i++) {
      document.getElementById("players").childNodes[
        Rank.scoreCopy[i].player
      ].childNodes[2].innerHTML += "<br>" + Rank.scoreCopy[i].rank;
      if (Rank.scoreCopy[i].draw) {
        document.getElementById("players").childNodes[
          Rank.scoreCopy[i].player
        ].childNodes[2].innerHTML += " Draw";
      }
    }
    if (document.getElementById("console").checked) {
      console.log("ply: ", ply);
      console.log("Rank: ", Rank);
      console.log("------------------------");
    }
  }
  if (document.getElementById("result").checked) {
    for (k0 = 0; k0 < players; k0++) {
      document.getElementsByClassName("check")[k0].style.opacity = 1;
    }
  }
}
function simulator() {
  dd = 0;
  simm = 0;
  for (sim = 0; sim < 10000; sim++) {
    c = shuffle();
    for (b = 0; b < players; b++) {
      c2[b] = c[1][b];
      c2[b] = c2[b].concat(c[2].flat());
      c2[b].push(c[3]);
      c2[b].push(c[4]);
      delete ply[b];
      ply[b] = new player(c2[b]);
    }
    Rank = new rank(ply);

    if (Rank.scoreCopy[0].score == 6 && Rank.scoreCopy[1].score == 6) {
      simm++;
    }
  }

  document.getElementById("config").innerHTML = (simm * 100) / sim + "%";
}
function _game() {
  iri++;
  if (iri % 2) {
    document.getElementById("input").disabled = true;
    document.getElementById("deal").disabled = true;
    document.getElementById("test").disabled = true;
    document.getElementById("test1").disabled = true;
    document.getElementById("test2").disabled = true;
    document.getElementById("sim").disabled = true;
    document.getElementById("result").checked = false;
    document.getElementById("console").checked = false;
    document.getElementById("result").disabled = true;
    document.getElementById("console").disabled = true;
    document.getElementById("dep").disabled = true;
    document.getElementById("small").disabled = true;
    document.getElementById("fold").disabled = false;
    document.getElementById("check").disabled = false;
    document.getElementById("call").disabled = false;
    document.getElementById("raise").disabled = false;
    document.getElementById("bid").disabled = false;
    document.getElementById("game").innerHTML = "Game stop";
    start();
  } else {
    document.getElementById("input").disabled = false;
    document.getElementById("deal").disabled = false;
    document.getElementById("test1").disabled = false;
    document.getElementById("sim").disabled = false;
    document.getElementById("dep").disabled = false;
    document.getElementById("small").disabled = false;
    document.getElementById("fold").disabled = true;
    document.getElementById("check").disabled = true;
    document.getElementById("call").disabled = true;
    document.getElementById("raise").disabled = true;
    document.getElementById("bid").disabled = true;
    document.getElementById("game").innerHTML = "Game start";
    document.getElementById("players").innerHTML = "";
    document.getElementById("ground").innerHTML = "";
  }
}
function start() {
  gamee = new Game();
  document.getElementById("fold").addEventListener("click", function () {
    gamee.action(t, 1);
  });
  document.getElementById("check").addEventListener("click", function () {
    gamee.action(t, 2);
  });
  document.getElementById("call").addEventListener("click", function () {
    gamee.action(t, 3);
  });
  document.getElementById("raise").addEventListener("click", function () {
    gamee.action(t, 4);
  });
}
function Game() {
  let _small, big;
  this.init = function () {
    deal();
    allin = [];
    stp = 0;
    _stpi = 0;
    for (b = 0; b < players; b++) {
      c2[b] = c2[b].concat(c[2].flat(), c[3], c[4]);
    }
    _small = parseInt(document.getElementById("small").value);
    dealer = parseInt(Math.random() * players);
    t = (dealer + 3) % players;
    big = _small * 2;
    document.querySelector(
      "#players>div:nth-of-type(" + (dealer + 1) + ")>span:nth-of-type(1)"
    ).innerHTML = _dealerSVG;
    this.account = new Array(players).fill(
      parseInt(document.getElementById("dep").value)
    );
    chck = [];
    this.bid = big;
    this.active = [];
    for (a = 0; a < players; a++) {
      this.active.push(a);
    }
    this.pot = [0, 0, 0, 0];
    this.pot[0] = _small * 3;
    this.account[(dealer + 1) % players] -= _small;
    this.account[(dealer + 2) % players] -= big;
    this.step = [
      new Array(players).fill(0),
      new Array(players).fill(0),
      new Array(players).fill(0),
      new Array(players).fill(0),
    ];
    this.step[0][(dealer + 1) % players] = _small;
    this.step[0][(dealer + 2) % players] = big;
    this.refresh();
  };
  this.action = function (_player, action) {
    _player = t;
    console.log("action", _player, action);
    switch (action) {
      case 1: {
        this.active.splice(this.active.indexOf(_player), 1, -1);
        document.querySelector(
          "#players>div:nth-of-type(" + (_player + 1) + ")"
        ).style.transform = "translateY(-40px)";
        break;
      }
      case 2: {
        chck[t] = true;
        break;
      }
      case 3: {
        chck[t] = true;
        temp = this.bid - this.step[_stpi][_player];
        this.account[_player] -= temp;
        this.step[_stpi][_player] = this.bid;
        this.pot[_stpi] += temp;
        break;
      }
      case 4: {
        temppp = parseInt(document.getElementById("bid").value);
        if (
          temppp >= this.bid * 2 &&
          temppp >= big &&
          temppp <= this.account[_player]
        ) {
          chck.fill(false);
          chck[t] = true;
          this.bid = temppp;
          this.account[_player] -= this.bid - this.step[_stpi][_player];
          this.pot[_stpi] += this.bid - this.step[_stpi][_player];
          this.step[_stpi][_player] = this.bid;
          if (this.account[_player] == 0) {
            this.active.splice(this.active.indexOf(_player), 1, -2);
          }
          break;
        } else {
          alert("Enter correct amount");
          return;
        }
      }
    }
    t++;
    while (this.active[t % players] < 0) {
      t++;
    }
    t = t % players;
    this.refresh();
  };
  this.refresh = function () {
    totpot = 0;
    console.log("refresh");
    this.pot.forEach((a) => {
      totpot += a;
    });
    document.getElementById("pot").innerHTML =
      this.pot[0] +
      "<br>" +
      this.pot[1] +
      "<br>" +
      this.pot[2] +
      "<br>" +
      this.pot[3] +
      "<hr>" +
      totpot;
    document.querySelectorAll("#players>div").forEach((v, i) => {
      tempstp = this.account[i] + "<hr>";
      for (si = 0; si <= _stpi; si++) {
        tempstp += this.step[si][i] + "<br>";
      }
      v.childNodes[5].innerHTML = tempstp;
    });
    document
      .querySelectorAll("#players>div>span:nth-of-type(2)")
      .forEach((a) => {
        a.style.animationName = "";
      });
    document.querySelector(
      "#players>div:nth-of-type(" + (t + 1) + ")>span:nth-of-type(2)"
    ).style.animationName = "pt";
    pcard.flat().forEach((a) => {
      a.hide();
    });
    pcard[t % players][0].show();
    pcard[t % players][1].show();
    if (this.bid != this.step[_stpi][t]) {
      document.getElementById("check").disabled = true;
    } else {
      document.getElementById("check").disabled = false;
    }
    if (this.bid != this.step[_stpi][t]) {
      document.getElementById("call").innerHTML =
        "Call + " + (this.bid - this.step[_stpi][t]);
      document.getElementById("call").disabled = false;
    } else {
      document.getElementById("call").innerHTML = "Call ";
      document.getElementById("call").disabled = true;
    }
    this.check();
  };
  this.check = function () {
    cnt1 = 0;
    cnt2 = 0;
    for (c = 0; c < players; c++) {
      if (this.active[c] < 0) {
        cnt1++;
      }
    }
    for (c = 0; c < players; c++) {
      if (chck[c] == true || this.active[c] < 0) {
        cnt2++;
      }
    }
    if (cnt1 == players - 1) {
      this.finish();
    } else if (cnt2 == players) {
      console.log("NEXT");
      this.next();
    }
  };
  this.next = function () {
    chck.fill(false);
    if (stp < 4) {
      stp++;
    }
    console.log(stp);
    switch (stp) {
      case 1: {
        gcard[0].show();
        gcard[1].show();
        gcard[2].show();
        break;
      }
      case 2: {
        gcard[3].show();
        break;
      }
      case 3: {
        gcard[4].show();
        break;
      }
      case 4: {
        this.finish();
        break;
      }
    }
    if (stp != 4) {
      // this.step[_stpi].fill(0)
      _stpi++;
      this.bid = 0;
      t = dealer + 1;
      while (this.active[t % players] < 0) {
        t++;
        t = t % players;
      }
      t = t % players;
      this.refresh();
    }
  };
  this.restart = function () {
    _stpi = 0;
    console.log("RESTART");
    document.getElementById("fold").disabled = false;
    document.getElementById("check").disabled = false;
    document.getElementById("raise").disabled = false;
    document.getElementById("bid").disabled = false;
    deal();
    for (b = 0; b < players; b++) {
      c2[b] = c2[b].concat(c[2].flat(), c[3], c[4]);
    }
    dealer = (dealer + 1) % players;
    t = (dealer + 3) % players;
    document.querySelector(
      "#players>div:nth-of-type(" + (dealer + 1) + ")>span:nth-of-type(1)"
    ).innerHTML = _dealerSVG;
    document.querySelector(
      "#players>div:nth-of-type(" + (t + 1) + ")>span:nth-of-type(2)"
    ).style.animationName = "pt";
    stp = 0;
    chck = [];
    this.pot = [0, 0, 0, 0];
    this.bid = big;
    this.active = [];
    for (a = 0; a < players; a++) {
      this.active.push(a);
    }
    this.pot[0] = _small * 3;
    this.account[(dealer + 1) % players] -= _small;
    this.account[(dealer + 2) % players] -= big;
    this.step = [
      new Array(players).fill(0),
      new Array(players).fill(0),
      new Array(players).fill(0),
      new Array(players).fill(0),
    ];
    this.step[0][(dealer + 1) % players] = _small;
    this.step[0][(dealer + 2) % players] = big;
    this.refresh();
  };
  this.finish = function () {
    document.getElementById("fold").disabled = true;
    document.getElementById("check").disabled = true;
    document.getElementById("call").disabled = true;
    document.getElementById("raise").disabled = true;
    document.getElementById("bid").disabled = true;
    document
      .querySelectorAll("#players>div>span:nth-of-type(2)")
      .forEach((a) => {
        a.style.animationName = "";
      });
    console.log("Finished");
    pcard.flat().forEach((a) => a.show());
    river = [];
    this.active.forEach((a, i) => {
      river.push(new player(c2[i]));
    });
    riverank = new rank(river);
    console.log(river);
    console.log(riverank);
    this.winner = [];
    temp = riverank.scoreCopy.filter((a) => {
      return this.active[a.player] != -1;
    });
    this.winner = temp.filter((a) => {
      return a.rank == temp[0].rank;
    });

    this.step[_stpi].forEach((a) => {
      this.pot[_stpi] += a;
    });
    numOfWinners = this.winner.length;

    quote = totpot / numOfWinners;

    this.winner.forEach((a, b) => {
      this.account[a.player] += quote;
      document.querySelectorAll(".check")[a.player].style.opacity = 1;
    });
    document.querySelectorAll("#players>div").forEach((v, i) => {
      v.childNodes[5].innerHTML =
        this.account[i] + "<br>" + this.step[_stpi][i];
    });
    totpot = 0;
    document.getElementById("pot").innerHTML = totpot;
    this.winner.forEach((a, b) => {
      document.getElementsByClassName("check")[a.player].innerHTML =
        river[a.player].title;
    });
    // setTimeout(() => this.restart(), 10000)
    document
      .getElementById("pot")
      .addEventListener("click", () => this.restart());
  };
  this.init();
}
