import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BookTransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        buttonState: 'normal',
        scanStudentid:" ",
        scanBookid:" "
      }
    }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);

      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
        const {buttonState} = this.state
        if(buttonState==="bookid"){
            this.setState({
                scanned:true,
                scannedBookid:data,
                buttonState:"normal"
            })
        }
        else if(buttonState==="studentid"){
      this.setState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal'
      });
    }
   }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
              <View>
                  <Image 
                  source={require("../assets/booklogo.jpg")}
                  style={{width:200, height:200}}/>
                  <Text style={{textAlign:'center', fontSize:30}}>WILI</Text>
              </View>
              <View style={styles.inputView}>
                  <TextInput 
                  style={styles.inputBox}
                  placeholder="book ID"/>
                  value = {this.state.scanBookid}
                  <TouchableOpacity 
                  style={styles.scanButton}
                  onPress={()=>{
                      this.getCameraPermissions("bookid")
                  }}>
                      <Text style={styles.buttonText}>Scan</Text>
                  </TouchableOpacity>
                  <View style={styles.inputView}>
                  <TextInput 
                  style={styles.inputBox}
                  placeholder="student ID"/>
                  value = {this.state.scanStudentid}
                  <TouchableOpacity 
                  style={styles.scanButton}
                  onPress={()=>{
                      this.getCameraPermissions("studentid")
                  }}>
                      <Text style={styles.buttonText}>Scan</Text>
                  </TouchableOpacity>
                  </View>
              </View>
          <Text style={styles.displayText}>{
            hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
          }</Text>     

          <TouchableOpacity
            onPress={this.getCameraPermissions}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    },

    inputView:{
        flexDirection :"row",
        margin:20
    },

    inputBox:{
        width:200,
        height:40,
        borderWidth:1.5,
        fontSize:20
    }
  });