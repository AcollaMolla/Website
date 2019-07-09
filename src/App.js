import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Sound from 'react-sound';
import ImageGallery from 'react-image-gallery';
import FormData from 'form-data';
import image0 from './004.JPG';
import image1 from './005.jpg';
import image2 from './006.jpg';
import image3 from './007.jpg';
//import video from './IMG_5146.mp4'
import sound from './001.mp3';
//import { BehaviorSubject } from 'rxjs';
const DEFAULT_BACKGROUND = "#282c34";

class Fish extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      fish: [],
      species: null,
      catchDate: null,
      length: null,
      weight: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    if(event.target.className === "namefield"){
      this.setState({
        species: event.target.value
      });
    }
    if(event.target.className === "catch-date"){
      this.setState({
        catchDate: event.target.value
      });
    }
    if(event.target.className === "length"){
      this.setState({
        length: event.target.value
      });
    }
    if(event.target.className === "weight"){
      this.setState({
        weight: event.target.value
      });
    }
  }
  handleSubmit(event){
    axios.post('//localhost:8081/fishing',{
      species: this.state.species,
      catchDate: this.state.catchDate,
      length: this.state.length,
      weight: this.state.weight
    });
    this.setState(prevState =>({
      popup: !this.state.popup,
      fish: [...prevState.fish, {species: this.state.species, catchDate: this.state.catchDate, length: this.state.length, weight: this.state.weight}]
    }));
    event.preventDefault();
  }
  renderPopup(){
    return(
      <div className = "popup">
        <div className = "popup-inner">
          <h1>Add new fish</h1>
            <form className = "addStockForm" onSubmit = {this.handleSubmit}>
            <p>Species: 
              <input className = "namefield" type="text" required = {true} onChange = {this.handleChange}></input>
            </p>
            <p>Catch date:
              <input className = "catch-date" type="date" required = {true} onChange = {this.handleChange}></input>
            </p>
            <p>Length:
              <input className = "length" type="text" required = {true} onChange = {this.handleChange}></input>
            </p>
            <p>Weight:
              <input className = "weight" type="text" onChange = {this.handleChange}></input>
            </p>
            <input type="submit" value="Submit" />
            <button onClick = { () => this.togglePopup()}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }
  togglePopup(){
    this.setState({
      popup: !this.state.popup
    });
  }
  componentDidMount(){
    axios.get('//localhost:8081/fishing')
      .then(res =>{
        const fish = Object.values(res.data);
        this.setState({fish});
      })
  }

  render(){
    console.log("render");
    return(
      <div className = "App-content">
      {this.state.popup ? this.renderPopup() : null}
      <h1>Fishes</h1>
      <table>
        <tbody>
          <tr><th>Species</th><th>Catch date</th><th>Length (cm)</th><th>Weight (kg)</th></tr>
          {this.state.fish.map(fish => <tr key={fish.catchDate}><td>{fish.species}</td><td>{fish.catchDate}</td><td>{fish.length}</td><td>{fish.weight}</td></tr>)}
        </tbody>
      </table>
      <button onClick = { () => this.togglePopup()}>Add fish</button>
      </div>
    );
  }
}

class Stocks extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      stocks: [],
      popup: false,
      name: null,
      bDate: null,
      sDate: null,
    });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    if(event.target.className === "namefield"){
      this.setState({
        name: event.target.value
      });
    }
    if(event.target.className === "buy-date"){
      this.setState({
        bDate: event.target.value
      });
    }
    if(event.target.className === "sell-date"){
      this.setState({
        sDate: event.target.value
      });
    }
  }
  handleSubmit(event){
    console.log("Skickar aktie");
    axios.post('//localhost:8081/stocks',{
      name: this.state.name,
      buyDate: this.state.bDate,
      sellDate: this.state.sDate
    });
    this.setState(prevState =>({
      popup: !this.state.popup,
      stocks: [...prevState.stocks, {name: this.state.name, buyDate: this.state.bDate, sellDate: this.state.sDate}]
    }));
    event.preventDefault();
  }
  renderPopup(){
    return(
      <div className = "popup">
        <div className = "popup-inner">
          <h1>Add new stock</h1>
            <form className = "addStockForm" onSubmit = {this.handleSubmit}>
            <p>Name: 
              <input className = "namefield" type="text" required = {true} onChange = {this.handleChange}></input>
            </p>
            <p>Buy date:
              <input className = "buy-date" type="date" required = {true} onChange = {this.handleChange}></input>
            </p>
            <p>Sell date:
              <input className = "sell-date" type="date" required = {true} onChange = {this.handleChange}></input>
            </p>
            <input type="submit" value="Submit" />
            <button onClick = { () => this.togglePopup()}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }
  togglePopup(){
    this.setState({
      popup: !this.state.popup
    });
  }
  componentDidMount(){
    axios.get('//localhost:8081/stocks') //Funkar med restcountries/all
      .then(res =>{
        const stocks = Object.values(res.data);
        this.setState({stocks});
      })
  }
  render(){
    console.log("render");
    console.log(this.state.persons);
    return(
      <div className = "App-content">
      {this.state.popup ? this.renderPopup() : null}
      <h1>Stocks</h1>
      <table>
        <tbody>
          <tr><th>Name</th><th>Buy date</th><th>Sell date</th></tr>
          {this.state.stocks.map(stock => <tr key={stock.buyDate}><td>{stock.name}</td><td>{stock.buyDate}</td><td>{stock.sellDate}</td></tr>)}
        </tbody>
      </table>
      <button onClick = { () => this.togglePopup()}>Add stock</button>
      </div>
    );
  }
}
class Clock extends React.Component{
  constructor(props){
    super(props); 
    this.state = {
      time: new Date().toLocaleString()
    };
  }

  componentDidMount(){
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount(){
    clearInterval(this.intervalID);
  }
  
  tick(){
    this.setState({
      time: new Date().toLocaleString()
    });
  }

  render(){
    return(
      <div className = "App-clock">
        <p>The time is {this.state.time}</p>
      </div>
    );
  }
}
class Gallery extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      images: [],
      filteredFiles: [],
      showImageGallery: false,
      showVideoGallery: false,
      showMusicGallery: false,
      showPopup: false,
      fileToUpload: null,
      tags: [],
      uploadButtonEnabled: false,
      firstLoad: false,
      selectedFilter: null
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount(){
    axios.get('//localhost:8081/images')
    .then(res =>{
      const images = Object.values(res.data);
      this.setState({images});
    })
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e){
    if(e.keyCode === 27 && this.state.showPopup === true){
      this.togglePopup();
    }
  }
  togglePopup(type){
    this.setState({
      showPopup: !this.state.showPopup,
      uploadButtonEnabled: false,
      tags: ""
    })
  }

  handleFile(e){
    this.setState({
      fileToUpload: e.target.files[0], 
      uploadButtonEnabled: true
    });
  }

  handleUpload(){
    let file = this.state.fileToUpload;
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('tags', this.state.tags);
    axios.post("//localhost:8081/images", formdata,{ 
    })
    .then(res => {
      let image = {
        original: "http://localhost:8081/images/" + res.data.filename,
        tags: this.state.tags
      }
      this.setState(prevState =>({
        images: [...prevState.images, image]
      }));
      this.togglePopup();
    })
  }

  handleTagsChange(e){
    let value = e.target.value.toLowerCase();
    if((value.indexOf(',')+1) === value.length){
      this.setState(prevState => ({
        tags: [...prevState.tags, value.substring(0, value.indexOf(','))]
      }))
      e.target.value = null;
    }
  }

  renderPopup(){
    return(
      <div className = "popup">
        <div className = "popup-inner">
          <h3>Add new file</h3>
          <form>
            <input type = "file" onChange = { (e) => this.handleFile(e)}></input><br></br>
            <label title = "Add a custom name to the file.">Name: 
              <input type = "text" onChange = { (e) => this.handleTagsChange(e)} placeholder="Use ',' as seperator."></input>
            </label><br></br>
            <label title = "Add search tags to you're image.">Tags: 
              <input type = "text" onChange = { (e) => this.handleTagsChange(e)} placeholder="Use ',' as seperator."></input>
            </label>
          </form>
          <button onClick = { () => this.togglePopup()}>Cancel</button>
          {this.state.uploadButtonEnabled ? <button onClick = { () => this.handleUpload()}>Upload</button> : <button onClick = { () => this.handleUpload()} disabled>Upload</button>}
        </div>
      </div>
    )
  }

  handleSelect(e){
    this.setState({selectedFilter: e.target.value});
    let filteredFile = [];
    this.state.images.forEach(function(element){
      //console.log(element.original.substring(element.original.indexOf('.')));
      const file = element.original;
      switch(e.target.value){
        case("All"):
          filteredFile.push(element);
          break;
        case("JPEG/PNG"):
          if(file.substring(file.indexOf('.')) === '.jpg' || file.substring(file.indexOf('.')) === '.jpeg'){
            filteredFile.push(element);
          }
          break;
        case("GIF"):
          if(file.substring(file.indexOf('.')) === '.gif'){
            filteredFile.push(element);
          }
          break;
        default:
          console.log("ERROR");
          break;
      }
    })
    this.setState({filteredFiles: filteredFile, firstLoad : true});
  }

  handleSearch(e){
    this.setState({selectedFilter: e.target.value});
    let filteredFile = [];
    this.state.images.forEach(function(element){
      if(element.original.substring(element.original.indexOf('-')).includes(e.target.value.toLowerCase()) || (element.tags !== null && element.tags.includes(e.target.value.toLowerCase()))){
        filteredFile.push(element);
      }
    })
    this.setState({filteredFiles:filteredFile, firstLoad : true});
    //console.log(this.state.filteredFiles);
  }

  renderImageGallery(){
    return(
      <div className = "App-gallery-images-full">
      <h1>Images</h1>
      <button onClick = { () => this.togglePopup("image")}>New image</button>
      <label>Filter
        <select onClick = { (e) => this.handleSelect(e)}>
          <option key = {0}>All</option>
          <option key = {1}>JPEG/PNG</option>
          <option key = {2}>GIF</option>
        </select>
      </label>
      <label>Search
        <input type = "text" onChange = { (e) => this.handleSearch(e)}></input>
      </label>
      {this.state.firstLoad ? 
        <ImageGallery items = {this.state.filteredFiles}></ImageGallery>
      : 
        <ImageGallery items = {this.state.images}></ImageGallery>}
      {this.state.firstLoad && this.state.filteredFiles.length === 0 ? <p>Wow such empty! You can help expand this gallery by <b className = "App-gallery-empty-filter" onClick = { () => this.togglePopup()}>uploading a {this.state.selectedFilter}</b> now!</p> : null}
      {this.state.showPopup ? this.renderPopup() : null}
    </div>
    )
  }
  toggleGallery(type){
    switch(type){
      case "image":
        this.setState({
          showImageGallery: true,
          showVideoGallery: false,
          showMusicGallery: false
        });
      break;
      case "video":
        this.setState({
          showImageGallery: false,
          showVideoGallery: true,
          showMusicGallery: false
        });
      break;
      case "music":
        this.setState({
          showImageGallery: false,
          showVideoGallery: false,
          showMusicGallery: true
        });
      break;
      default: break;
    }
  }
  render(){
    return(
      <div className = "App-content">
        {this.state.showImageGallery ? this.renderImageGallery():
          <div className = "App-gallery">
            <div onClick = { () => this.toggleGallery("image")} className = "App-gallery-images">
              <p>Images</p>
            </div>
            <div className = "App-gallery-videos">
              <p>Videos</p>
            </div>
            <div className = "App-gallery-music">
              <p>Music</p>
            </div>
          </div>
        }
      </div>

    );
  }
}
class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pressedKeys: ""
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e){
    let key = e.keyCode;
    this.setState(prevState =>({
      pressedKeys: [...prevState.pressedKeys, key]
    }));
    console.log(this.state.pressedKeys);
    if(this.state.pressedKeys.length > 4)
      this.setState({pressedKeys:""})
    if(this.state.pressedKeys[0] === 66 && this.state.pressedKeys[1] === 65 && this.state.pressedKeys[2] === 74 && this.state.pressedKeys[3] === 83){
      console.log("secret unlocked");
      this.setState({
        pressedKeys: ""
      })
    }
  }

  render(){
    return(
        <h1>Chat</h1>
    )
  }
}
class Test extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userId: 0, //A test variable to fetch settings based on user's unique id.
      pageView: 0,
      color: DEFAULT_BACKGROUND,
      popup: false,
      image: {
        isImage: false,
        url: null
      },
      settings: {
        background: null
      }
    };
  }
  componentDidMount(){
    axios.get('//localhost:8081/settings/' + this.state.userId)
      .then(res =>{
        const settings = Object.values(res.data)
        //Check if color or image is null and set state accordingly
        console.log(settings);
        if(settings[0].isImage !== true)
          this.setState({color: settings[0].backgroundColor});
        else if(typeof(settings[0].isImage) != 'undefined'){
          console.log("here");
          this.setState({image : settings[0]});
        }
      })
  }
  renderMenu(){
    return(
      <div className="App-menu">
        <button className="App-menu-button"
          onClick={() => this.menuClick(0)}
          >Start
        </button>
        <button className="App-menu-button"
          onClick={() => this.menuClick(1)}
          >Stocks
        </button>
        <button className="App-menu-button"
          onClick={() => this.menuClick(2)}
          >Fishing
        </button>
        <button className="App-menu-button"
          onClick={() => this.menuClick(3)}
          >Gallery
        </button>
        <button className="App-menu-button"
          onClick={() => this.menuClick(4)}
          >Ulvsby Pirate Chat
        </button>
        <button className="App-menu-button"
          //onClick={() => this.menuClick(5)}
          >Pirate Quiz
        </button>
        <button className="App-menu-button"
          onClick={() => this.menuClick(10)}
          >Settings
        </button>
      </div>
    );
  }
  renderSettings(){
    return(
      <div className = "App-settings">
      <h1>Settings</h1>
      <div className = "background">
        <h3>Background layout</h3>
        <p>Color:
          <button title = "Deep dark blue like the nightsky hovering above Sågis" onClick = { () => this.changeColor("#282c34")}>Sågis Nightsky Blue</button>
          <button title = "Green like the trees and forests covering the ruins of Sågis" onClick = { () => this.changeColor("#42f445")}>Sågis Jungle Green</button>
          <button title = "Red as the holy fortress once standing tall beside Sågis Bay" onClick = { () => this.changeColor("#a91107")}>Sågis Red</button>
          <button title = "As blue as the pure water in Sågis Bay" onClick = { () => this.changeColor("#26b4c1")}>Sågis Bay Blue</button>
        </p>
        <p>Image:
          <button onClick = { () => this.changeImage(image0)}>Aerial</button>
          <button onClick = { () => this.changeImage(image1)}>Winter Sågis</button>
          <button onClick = { () => this.changeImage(image2)}>Inside the Fort</button>
          <button onClick = { () => this.changeImage(image3)}>Staircase to Heaven</button>
        </p>
      </div>
      <div className = "background">
        <h3>Text and fonts</h3>
        <p>Color:
          <button title = "White as the snow covering the ruins of Sågis">Sågis Snow White</button>
        </p>
        <p>Font:
          <button title = "Easy to read so why change?">Standard</button>
          <button title = "After a bottle of rum">Pirate</button>
        </p>
        <p>Font size:
          <button title = "A font size for normal people">Normal</button>
          <button title = "When you're almost blind">Scyllas mormor</button>
        </p>
      </div>
      <div className = "background">
        <h3>Background music</h3>
        <p>Track:
          <button>Heroes of Might & Magic III</button>
        </p>
      </div>
      <div className = "background">
        <h3>Test</h3>
      </div>
      </div>
    );
  }
  changeColor(color){
    this.setState({
      color: color,
      image: {
        isImage: false,
        url: null
      }
    });
    axios.post('//localhost:8081/settings/' + this.state.userId, {
      backgroundColor: color,
      isImage: false,
      url: null
    });
  }
  changeImage(image){
    console.log("Image path: " + image);
    this.setState({
      color: DEFAULT_BACKGROUND,
      image: {
        isImage: true,
        url: image
      }
    })
    axios.post('//localhost:8081/settings/' + this.state.userId, {
      url: image,
      isImage: true,
      color: DEFAULT_BACKGROUND
    });
  }
  render(){
    if(this.state.pageView === 0){
      return(
        <div className="App">
        <Sound url={sound} playStatus={Sound.status.PLAYING} playFromPosition={0}></Sound>
        <header className="App-header" style={this.state.image.isImage ? {backgroundImage: 'url(' + this.state.image.url + ')', backgroundSize: 'cover'} : {backgroundColor: this.state.color}}>
        {this.renderMenu()}
        <Clock></Clock>
          <div>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          </div>
        </header>
      </div>
      );
    }
    if(this.state.pageView === 1){
      return(
        <div className="App">
        <Sound url={sound} playStatus={Sound.status.PLAYING} playFromPosition={0}></Sound>
        <header className="App-header" style={this.state.image.isImage ? {backgroundImage: 'url(' + this.state.image.url + ')', backgroundSize: 'cover'} : {backgroundColor: this.state.color}}>
        {this.renderMenu()}
        <Clock></Clock>
        <Stocks></Stocks>
        </header>
        </div>
      );
    }
    if(this.state.pageView === 2){
      return(
        <div className="App">
          <Sound url={sound} playStatus={Sound.status.PLAYING} playFromPosition={0}></Sound>
          <header className="App-header" style={this.state.image.isImage ? {backgroundImage: 'url(' + this.state.image.url + ')', backgroundSize: 'cover'} : {backgroundColor: this.state.color}}>
            {this.renderMenu()}
            <Clock></Clock>
            <Fish></Fish>
          </header>
        </div>
      );
    }
    if(this.state.pageView === 3){
      return(
        <div className="App">
          <Sound url={sound} playStatus={Sound.status.PLAYING} playFromPosition={0}></Sound>
          <header className="App-header" style={this.state.image.isImage ? {backgroundImage: 'url(' + this.state.image.url + ')', backgroundSize: 'cover'} : {backgroundColor: this.state.color}}>
            {this.renderMenu()}
            <Clock></Clock>
            <Gallery></Gallery>
          </header>
        </div>
      );
    }
    if(this.state.pageView === 4){
      return(
        <div className="App">
          <Sound url={sound} playStatus={Sound.status.PLAYING} playFromPosition={0}></Sound>
          <header className="App-header" style={this.state.image.isImage ? {backgroundImage: 'url(' + this.state.image.url + ')', backgroundSize: 'cover'} : {backgroundColor: this.state.color}}>
            {this.renderMenu()}
            <Clock></Clock>
            <Chat></Chat>
          </header>
        </div>
      );
    }
    if(this.state.pageView === 10){
      return(
        <div className="App">
          <Sound url={sound} playStatus={Sound.status.PLAYING} playFromPosition={0}></Sound>
        <header className="App-header" style={this.state.image.isImage ? {backgroundImage: 'url(' + this.state.image.url + ')', backgroundSize: 'cover', backgroundRepeat: 'repeat-y'} : {backgroundColor: this.state.color}}>
        {this.renderMenu()}
        <Clock></Clock>
        {this.renderSettings()}
        </header>
        </div>
      );
    }
  }
  menuClick(src){
    this.setState({
      pageView : src
    })
  }
}
function App() {
  return (
    <Test></Test>
  );
}

export default App;
