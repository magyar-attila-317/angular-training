import {Component} from '@angular/core';

interface PeppaInterface {
  name: string,
  sex: string,
  imgUrl: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  allCharacters: Array<PeppaInterface> = [
    {
      name: 'Peppa Pig',
      sex: 'female',
      imgUrl: 'https://i5.walmartimages.com/asr/40c4baef-703b-4d2a-8d3d-4e251453950d_1.2e9513fbb59279d2f86d8b9c85863e35.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'
    },
    {
      name: 'Daddy Pig',
      sex: 'male',
      imgUrl: 'https://vignette.wikia.nocookie.net/official-peppa-pig/images/a/af/Daddy_Pig-0.png/revision/latest?cb=20180505173037'
    },
    {
      name: 'Mummy Pig',
      sex: 'female',
      imgUrl: 'https://vignette.wikia.nocookie.net/peppapig/images/1/19/Mummy_Pig.png/revision/latest?cb=20181208163034'
    },
    {
      name: 'Georgie Pig',
      sex: 'male',
      imgUrl: 'https://www.partyrama.co.uk/wp-content/uploads/2014/02/peppa-pig-george-pig-lifesize-cardboard-cutout-60cms-product-image.jpg'
    },
    {
      name: 'Suzy Sheep',
      sex: 'female',
      imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41L9FG9dB7L._SY450_.jpg'
    },
    {
      name: 'Danny Dog',
      sex: 'male',
      imgUrl: 'https://www.partyrama.co.uk/wp-content/uploads/2014/02/peppa-pig-danny-dog-lifesize-cardboard-cutout-78cms-product-image.jpg'
    },
    {
      name: 'Zoe Zebra',
      sex: 'female',
      imgUrl: 'https://www.partyrama.co.uk/wp-content/uploads/2014/02/peppa-pig-zoe-zebra-lifesize-cardboard-cutout-79cm-product-image.jpg'
    },
    {
      name: 'Pedro Pony',
      sex: 'male',
      imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41HahXdyxCL._SX425_.jpg'
    },
  ];

  toDisplay: string = '';
  characters: Array<PeppaInterface> = [];

  showBoysOnly(): void {
    this.toDisplay = 'boys';
    this.characters = this.allCharacters.filter(character => character.sex === 'male');
  }

  showGirlsOnly(): void {
    this.toDisplay = 'girls';
    this.characters = this.allCharacters.filter(character => character.sex === 'female');
  }

  showEveryone(): void {
    this.toDisplay = 'everyone';
    this.characters = this.allCharacters;
  }

}
