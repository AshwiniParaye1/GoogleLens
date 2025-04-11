"use client";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import {
  IonActionSheet,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonToolbar
} from "@ionic/react";
import {
  cameraOutline,
  chevronBackOutline,
  closeOutline,
  cropOutline,
  imageOutline,
  searchOutline
} from "ionicons/icons";
import type React from "react";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./ImageSearchPage.css";

const ImageSearchPage: React.FC = () => {
  const history = useHistory();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [cropStart, setCropStart] = useState({ x: 0, y: 0 });
  const [cropEnd, setCropEnd] = useState({ x: 0, y: 0 });
  const [isCropVisible, setIsCropVisible] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const takePicture = async (source: CameraSource) => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: source
      });

      setCapturedImage(image.dataUrl || null);
      setShowActionSheet(false);
    } catch (error) {
      console.error("Error taking picture:", error);
    }
  };

  const handleCapture = () => {
    setShowActionSheet(true);
  };

  const handleCrop = () => {
    setIsCropping(true);
    setIsCropVisible(false);
  };

  const handleCancelCrop = () => {
    setIsCropping(false);
    setIsCropVisible(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isCropping) return;

    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setCropStart({ x, y });
    setCropEnd({ x, y });
    setIsCropVisible(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isCropping || !isCropVisible) return;

    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setCropEnd({ x, y });
  };

  const handleTouchEnd = () => {
    if (!isCropping || !isCropVisible) return;

    // Apply crop
    if (imageRef.current && canvasRef.current && capturedImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const img = imageRef.current;

        // Calculate crop dimensions
        const cropX = Math.min(cropStart.x, cropEnd.x);
        const cropY = Math.min(cropStart.y, cropEnd.y);
        const cropWidth = Math.abs(cropEnd.x - cropStart.x);
        const cropHeight = Math.abs(cropEnd.y - cropStart.y);

        // Set canvas dimensions to crop size
        canvas.width = cropWidth;
        canvas.height = cropHeight;

        // Calculate scale factor between displayed image and original image
        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;

        // Draw cropped portion to canvas
        ctx.drawImage(
          img,
          cropX * scaleX,
          cropY * scaleY,
          cropWidth * scaleX,
          cropHeight * scaleY,
          0,
          0,
          cropWidth,
          cropHeight
        );

        // Get data URL from canvas
        const croppedImageDataUrl = canvas.toDataURL("image/jpeg");
        setCapturedImage(croppedImageDataUrl);
      }
    }

    setIsCropping(false);
    setIsCropVisible(false);
  };

  const handleSearch = () => {
    if (capturedImage) {
      // In a real app, we would send the image to Google Lens API
      // For this demo, we'll navigate to a mock results page
      history.push({
        pathname: "/search-results",
        state: { imageData: capturedImage }
      });
    }
  };

  const handleCancel = () => {
    setCapturedImage(null);
    setIsCropping(false);
    setIsCropVisible(false);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          {capturedImage && (
            <IonButtons slot="end">
              <IonButton onClick={handleCancel}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="image-search-container">
          {!capturedImage ? (
            <div className="camera-placeholder">
              <div className="camera-instructions">
                <IonIcon icon={cameraOutline} className="camera-icon" />
                <IonText color="medium">
                  <h2>Search with your camera</h2>
                  <p>Take a photo or upload from your gallery</p>
                </IonText>
              </div>

              <IonFab vertical="bottom" horizontal="center" slot="fixed">
                <IonFabButton onClick={handleCapture}>
                  <IonIcon icon={cameraOutline} />
                </IonFabButton>
              </IonFab>
            </div>
          ) : (
            <div
              className="image-preview-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                ref={imageRef}
                src={capturedImage || "/placeholder.svg"}
                alt="Captured"
                className="captured-image"
              />

              {isCropVisible && (
                <div
                  className="crop-overlay"
                  style={{
                    left: `${Math.min(cropStart.x, cropEnd.x)}px`,
                    top: `${Math.min(cropStart.y, cropEnd.y)}px`,
                    width: `${Math.abs(cropEnd.x - cropStart.x)}px`,
                    height: `${Math.abs(cropEnd.y - cropStart.y)}px`
                  }}
                ></div>
              )}

              <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

              {!isCropping ? (
                <div className="image-actions">
                  <IonButton
                    fill="clear"
                    className="action-button"
                    onClick={handleCrop}
                  >
                    <IonIcon icon={cropOutline} slot="start" />
                    Crop
                  </IonButton>

                  <IonButton
                    fill="solid"
                    className="search-button"
                    onClick={handleSearch}
                  >
                    <IonIcon icon={searchOutline} slot="start" />
                    Search
                  </IonButton>
                </div>
              ) : (
                <div className="crop-actions">
                  <IonButton
                    fill="clear"
                    className="action-button"
                    onClick={handleCancelCrop}
                  >
                    <IonIcon icon={chevronBackOutline} slot="start" />
                    Cancel
                  </IonButton>

                  <IonText color="medium" className="crop-instructions">
                    Drag to crop
                  </IonText>
                </div>
              )}
            </div>
          )}
        </div>

        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: "Take Photo",
              icon: cameraOutline,
              handler: () => {
                takePicture(CameraSource.Camera);
              }
            },
            {
              text: "Choose from Gallery",
              icon: imageOutline,
              handler: () => {
                takePicture(CameraSource.Photos);
              }
            },
            {
              text: "Cancel",
              role: "cancel"
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ImageSearchPage;
