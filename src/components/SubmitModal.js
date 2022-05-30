import React from 'react'
import { Button,Modal } from 'react-bootstrap'

class SubmitModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showHide : true
        }
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    render(){
        return(
            <div>
                <Modal show={this.state.showHide}>
                    <div className="modal-header" id="modal-header">
                        <h4 className="modal-title" id="modal-title">
                            Listing Added!
                        </h4>
                        <button type="button" className="btn " onClick={() => this.handleModalShowHide()}>✕</button>
                    </div>

                    <Modal.Body>
                        <form>
                            <p class=" m-0">Please review the change under the 'My listings' tab! </p>
                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default SubmitModal;
