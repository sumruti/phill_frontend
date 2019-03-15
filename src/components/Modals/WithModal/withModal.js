// HOC to make components capable of triggered modals
// import React, { PureComponent } from 'react';
// import DetailsModal from '../Modals/Details';

// const withModal = MyComponent => {
//     return class extends PureComponent {
//         state = {
//             modalsStack =[],
//             showModal: false,
//             detailsModalDataByType: {}
//         }

//         handleTriggerDetailsModal = detailsModalData => {
//             // Push type onto the modals stack to be able to pop them when the user closes them and show the one underneath
//             this.seState({
//                 modalsStack: [...this.state.modalsStack, detailsModalData.type],
//                 showModal: true,
//                 detailsModalDataByType: {
//                     [detailsModalData.type]: detailsModalData
//                 }
//             })
//         }

//         handleModalClose = () => {
//             const currentModalsStack = this.state.modalsStack.slice(0, this.state.modalsStack.length - 1);

//             if (currentModalsStack.length <= 0) {
//                 this.setState({
//                     modalsStack =[],
//                     showModal: false,
//                     detailsModalDataByType: {}
//                 })
//             } else {
//                 const modalTypeToClose = this.state.modalsStack[this.state.modalsStack.length - 1];

//                 const currentDetailsModalDataByType = Object.keys(this.state.detailsModalDataByType).filter(type => {
//                     if (type !== modalTypeToClose) {
//                         return { [type]: this.state.detailsModalDataByType[type] }
//                     }
//                 })
//                 this.setState({
//                     modalsStack: currentModalsStack,
//                     detailsModalDataByType: currentDetailsModalDataByType
//                 })
//             }
//         }

//         render() {
//             let ComponentToRender;

//             if (this.state.showModal) {
//                 ComponentToRender = <DetailsModal details={this.state.detailsModalDataByType[this.state.modalsStack.length - 1]} handleModalClose={this.handleModalClose} />
//             }
//             else {
//                 ComponentToRender = <Component handleTriggerDetailsModal={this.handleTriggerDetailsModal} {...this.props} />
//             }
//         }
//     }
// }

// export default withModal;
