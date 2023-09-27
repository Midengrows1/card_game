$(function () {
  const memoryImg = $(".memory__card img");
  const memoryCard = $(".memory__card ");
  const memoryBtn = $(".start");
  const memoryReset = $(".reset");
  const imageArr = ["angular", "ember", "js-badge", "react", "vue"];
  //   Создание картинок
  function AddImg() {
    memoryImg.each(function () {
      let imgItem = $(this);
      imageArr.forEach((i) => {
        if (i == imgItem.attr("alt")) {
          imgItem.attr("src", `./img/${i}.svg`);
        }
      });
    });
  }
  AddImg();
  memoryBtn.click(flipCards);
  let hasFlippedCard = false;
  let lockFlip = false;
  let firstCard;
  let secondCard;
  function flipCards() {
    memoryCard.each(function () {
      $(this).addClass("flip");
      resetCard();
    });
    $(this).unbind("click", flipCards);
  }
  memoryReset.on("click", function () {
    memoryCard.each(function () {
      $(this).removeClass("flip");
      $(this).removeClass("flipped");
      resetCard();
      randomPos();
    });
    memoryBtn.on("click", flipCards);
  });
  memoryCard.each(function () {
    const cardItem = $(this);
    cardItem.on("click", cardFlip);

    function cardFlip() {
      if (!cardItem.hasClass("flip")) return;
      if (lockFlip) return;
      if ($(this) === firstCard) return;
      cardItem.removeClass("flip");
      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = $(this);
        return;
      }
      secondCard = $(this);

      matchCheck(cardFlip);
    }
  });
  function matchCheck(func) {
    if (firstCard.attr("id") === secondCard.attr("id")) {
      firstCard.unbind("click", func);
      secondCard.unbind("click", func);
      console.log(func);
      console.log(firstCard);
      console.log(secondCard);
      resetCard();
      return;
    }
    unflipCards();
  }
  function unflipCards() {
    lockFlip = true;
    setTimeout(() => {
      firstCard.addClass("flip");
      secondCard.addClass("flip");
      resetCard();
    }, 400);
  }
  function resetCard() {
    hasFlippedCard = false;
    lockFlip = false;
    firstCard = "";
    secondCard = "";
  }
  function randomPos() {
    memoryCard.each(function () {
      let newPosition = Math.round(Math.random() * 10);
      $(this).css("order", newPosition);
    });
  }
});
