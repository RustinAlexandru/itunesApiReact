
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";


interface AppProps {
}


class App extends React.Component<AppProps, any> {

    constructor(props) {
        super(props)
        this.state = {
            listItems : []
        }

        this.sendAjax = this.sendAjax.bind(this)
        this.setItems = this.setItems.bind(this)
    }


    sendAjax(url) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success : function(data){
                this.setItems(data)
            }.bind(this)
        })
    }

    setItems(data) {
        console.log('setting state')
        this.setState(
            {
                listItems : data.results
            }
        )
        console.log('state:', this.state.listItems)
    }




    render() {
        return (
            <div>
                <UserForm sendAjax={this.sendAjax} />
                <List listItems={this.state.listItems} />
            </div>
        );
    }
}


interface UserFormProps {
    sendAjax(url: string) : void;
}

class UserForm extends React.Component<UserFormProps, any> {

    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            selectValue: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        let url = `https://itunes.apple.com/search?term=${this.state.inputValue}&country=us&entity=${this.state.selectValue}`
        this.props.sendAjax(url)
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <input type="text" value={this.state.inputValue} name="inputValue" onChange={this.handleChange} />
                <select name="selectValue" id="" value={this.state.selectValue} onChange={this.handleChange} >
                    <option value="software">Apps</option>
                    <option value="movie">Films</option>
                </select>
                <button>Search</button>
            </form>
        )
    }
}

let List = function List(props) {
    return (
        <ul>
            {props.listItems.map( (x, index) => <Item key={index} text={x.trackName} />)}
        </ul>
    )
}

let Item = function Item(props) {
    return (
        <li>
            {props.text}
        </li>
    )
}

ReactDOM.render(<App />,  document.getElementById("root"));