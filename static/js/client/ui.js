var ui = {
  buttonClicked: false,
  loadSounds: function () {
      createjs.Sound.registerSound('../../sounds/client/signalsendsound.wav', 'signalSend')
      createjs.Sound.registerSound('../../sounds/client/timernotdonesound.wav', 'timerNotDone')

  },

  handleClick: function (signal) {
    if (!this.buttonClicked) {
      net.sendSignal(signal)
      createjs.Sound.play('signalSend')
      this.buttonClicked = true
      console.log('Started Timer');

      setTimeout(function () {

        ui.buttonClicked = false;
        console.log('Ended Timer');
      }, 10000);

    }else if (this.buttonClicked) {
      console.log(this.buttonClicked);
      createjs.Sound.play('timerNotDone')
      swal(
        'Hov Hov...',
        'Vent lige 10 sekunder med at ringe på igen!',
        'error'
      );
    }
  },
  constructUiFromLoadout: function (loadout) {
    var markup = loadout
    //title
    $('.title').append(
      $('<center><h1>'+ markup.title +'</h1></center>')
    );

    //Buttons
    for (var i = 0; i < markup.buttons.length; i+=2) {
      $('.btnTable').append(
        $('<tr><td><button id="'+markup.buttons[i].id+'" class="bttn-fill bttn-lg bttn-'+ markup.buttons[i].color +' doorbellbutton">'+ markup.buttons[i].name +'</button><button id="' + markup.buttons[i+1].id + '" class="bttn-fill bttn-lg bttn-'+ markup.buttons[i+1].color +' doorbellbutton">'+ markup.buttons[i+1].name +'</button></td></tr>')
      );
    }

    //Add click events
    markup.buttons.forEach(function (button) {
      $('#' + button.id).click(function () {
        ui.handleClick(button.signal)
      })
    });
  }
}
