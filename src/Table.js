import React from 'react';
import './Table.css';

class Table extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            voteIndex: 0,
            participants: []
        }
    }

    handleTextChange = (evt) => {
      const value = evt.target.value;
      this.setState({name: value});
    }

    handleAddClick = (evt) => {
        let addRow = document.getElementById("addRow");
        let input = addRow.firstChild.firstChild;
        let voteIndex = this.state.voteIndex;
        let participants = this.state.participants;
        if (!input.value) { alert("Please enter name."); return; }
        if (voteIndex === 0) { alert('Please select venue.'); return;}
        
        participants.push({name: input.value, voteIndex: voteIndex});

        this.setState({participants: participants, voteIndex: 0});

        input.focus();
        input.value = "";
        for (let i =0; i < addRow.childElementCount; i++){
            addRow.children[i].className = "Table-cell";
        }
      
    }

    handleVote = (idx, evt) => {
        let addRow = document.getElementById("addRow");
        for (let i =0; i < addRow.childElementCount; i++){
            addRow.children[i].className = "Table-cell";
        }

        const target = evt.target;
        target.className = "Table-cell-selected";
        this.setState({voteIndex: idx});
       
    }

    componentWillReceiveProps(nextProps){
        const { refreshTable } = this.props;
        if (nextProps.refreshTable !== refreshTable) {
            this.setState({participants: [], voteIndex: 0});
        }
    }

    componentDidMount(){
        //console.log(this.props.headings);
    }

    render() {
    

      return (
          <div className="Table">
              {this.props.headings && this.props.headings.length > 0 ?
              <div>
              <table className="Table-table">
                  <thead>
                    <tr>
                        <th className="Table-heading" key="0">
                        <label>Participants</label>
                        </th>
                        {this.props.headings.map(function (heading, idx) {
                            return (
                                <th className="Table-heading" key={idx +1}>
                                    <a href={heading.venue.url} target="_blank" rel="noopener noreferrer">{heading.venue.name}</a>
                                    <br/>
                                    <label>{heading.venue.categories[0]}</label>
                                    <br /> <br/>
                                    <label>{heading.venue.rating}</label>
                                </th>
                            );
                        })}
                    </tr>
                  </thead>
                  <tbody className="Table-body">
                    {this.state.participants && this.state.participants.length > 0 &&
                    this.state.participants.map(function (p, idx) {
                            return (
                                <tr className="Table-row" key={idx}>
                                    <td className="Table-cell" key="0">
                                        <input className="Table-input" type="text" readOnly value={p.name}></input>
                                    </td>
                                    <td className={p.voteIndex !== 1 ? "Table-cell" : "Table-cell-selected"} key="1">
                                        <label></label>
                                    </td>
                                    <td className={p.voteIndex !== 2 ? "Table-cell" : "Table-cell-selected"} key="2">
                                        <label></label>
                                    </td>
                                    <td className={p.voteIndex !== 3 ? "Table-cell" : "Table-cell-selected"} key="3">
                                        <label></label>
                                    </td>
                                </tr>
                            );
                        })
                    }

                    <tr id="addRow" className="Table-row">
                        <td className="Table-cell" key="0">
                            <input autoFocus className="Table-input" type="text" placeholder="Type here" onChange={this.handleTextChange} />
                        </td>
                        <td className="Table-cell" key="1" onClick={this.handleVote.bind(this, 1)}>
                            <label></label>
                        </td>
                        <td className="Table-cell" key="2" onClick={this.handleVote.bind(this, 2)}>
                            <label></label>
                        </td>
                        <td className="Table-cell" key="3" onClick={this.handleVote.bind(this, 3)}>
                            <label></label>
                        </td>
                    </tr>

                  </tbody>
                  
              </table>
              <input type="button" className="Table-button" value="Add Participant" onClick={this.handleAddClick.bind(this)}></input>
              </div>
              :
              null
              }
          </div>
      );
  }

}





export default Table;