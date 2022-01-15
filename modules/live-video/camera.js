/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
// import * as posedetection from "@tensorflow-models/pose-detection";
import * as scatter from "scatter-gl";

import * as params from "./params";
import { isMobile } from "./util";
import { getAngle, visibleCoords } from "./Logics";

// These anchor points allow the pose pointcloud to resize according to its
// position in the input.
const ANCHOR_POINTS = [
  [0, 0, 0],
  [0, 1, 0],
  [-1, 0, 0],
  [-1, -1, 0],
];

const COLOR_PALETTE = [
  "#ffffff",
  "#800000",
  "#469990",
  "#e6194b",
  "#42d4f4",
  "#fabed4",
  "#aaffc3",
  "#9a6324",
  "#000075",
  "#f58231",
  "#4363d8",
  "#ffd8b1",
  "#dcbeff",
  "#808000",
  "#ffe119",
  "#911eb4",
  "#bfef45",
  "#f032e6",
  "#3cb44b",
  "#a9a9a9",
];
export class Camera {
  constructor() {
    this.video = document.getElementById("video");
    this.canvas = document.getElementById("output");
    this.ctx = this.canvas.getContext("2d");
    this.scatterGLEl = document.querySelector("#scatter-gl-container");
    this.scatterGL = new scatter.ScatterGL(this.scatterGLEl, {
      rotateOnStart: true,
      selectEnabled: false,
      styles: { polyline: { defaultOpacity: 1, deselectedOpacity: 1 } },
    });
    this.scatterGLHasInitialized = false;
  }

  /**
   * Initiate a Camera instance and wait for the camera stream to be ready.
   * @param cameraParam From app `STATE.camera`.
   */
  static async setupCamera(cameraParam) {
    if(typeof window != 'undefined') {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          "Browser API navigator.mediaDevices.getUserMedia not available"
        );
      }   
    }
   

    const { targetFPS, sizeOption } = cameraParam;
    const $size = params.VIDEO_SIZE[sizeOption];
    const videoConfig = {
      audio: false,
      video: {
        facingMode: "user",
        // Only setting the video to a specified size for large screen, on
        // mobile devices accept the default size.
        width: isMobile() ? params.VIDEO_SIZE["360 X 270"].width : $size.width,
        height: isMobile()
          ? params.VIDEO_SIZE["360 X 270"].height
          : $size.height,
        frameRate: {
          ideal: targetFPS,
        },
      },
    };

    const stream = typeof window != 'undefined' && await navigator.mediaDevices.getUserMedia(videoConfig);

    const camera = new Camera();
    camera.video.srcObject = stream;

    await new Promise((resolve) => {
      camera.video.onloadedmetadata = () => {
        resolve(this.video);
      };
    });

    camera.video.play();

    const videoWidth = camera.video.videoWidth;
    const videoHeight = camera.video.videoHeight;
    // Must set below two lines, otherwise video element doesn't show.
    camera.video.width = videoWidth;
    camera.video.height = videoHeight;

    camera.canvas.width = videoWidth;
    camera.canvas.height = videoHeight;
    const canvasContainer = document.querySelector(".canvas-wrapper");
    canvasContainer.style = `width: ${videoWidth}px; height: ${videoHeight}px`;

    // Because the image from camera is mirrored, need to flip horizontally.
    camera.ctx.translate(camera.video.videoWidth, 0);
    camera.ctx.scale(-1, 1);

    camera.scatterGLEl.style = `width: ${videoWidth}px; height: ${videoHeight}px;`;
    camera.scatterGL.resize();

    camera.scatterGLEl.style.display = params.STATE.modelConfig.render3D
      ? "inline-block"
      : "none";

    return camera;
  }

  drawCtx() {
    this.ctx.drawImage(
      this.video,
      0,
      0,
      this.video.videoWidth,
      this.video.videoHeight
    );
  }

  clearCtx() {
    this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
  }

  /**
   * Draw the keypoints and skeleton on the video.
   * @param poses A list of poses to render.
   */
  // drawResults(poses) {
  //   for (const pose of poses) {
  //     this.drawResult(pose);
  //   }
  // }

  /**
   * Draw the keypoints and skeleton on the video.
   * @param pose A pose with keypoints to render.
   */
  // drawResult(pose) {
  //   if (pose.keypoints != null) {
  //     this.drawKeypoints(pose.keypoints);
  //     this.drawSkeleton(pose.keypoints, pose.id);
  //   }
  //   if (pose.keypoints3D != null && params.STATE.modelConfig.render3D) {
  //     this.drawKeypoints3D(pose.keypoints3D);
  //   }
  // }

  /**
   * Draw the keypoints on the video.
   * @param keypoints A list of keypoints.
   */
  // drawKeypoints(keypoints) {
  //   const keypointInd = posedetection.util.getKeypointIndexBySide(
  //     params.STATE.model
  //   );
  //   this.ctx.fillStyle = "Green";
  //   this.ctx.strokeStyle = "White";
  //   this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH;

  //   for (const i of keypointInd.middle) {
  //     this.drawKeypoint(keypoints[i]);
  //   }

  //   // this.ctx.fillStyle = "Green";
  //   for (const i of keypointInd.left) {
  //     this.drawKeypoint(keypoints[i]);
  //   }

  //   // this.ctx.fillStyle = "Orange";
  //   for (const i of keypointInd.right) {
  //     this.drawKeypoint(keypoints[i]);
  //   }
  // }

  drawKeypoint(keypoint) {
    // If score is null, just show the keypoint.
    const score = keypoint.score != null ? keypoint.score : 1;
    const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0;

    if (score >= scoreThreshold) {
      const circle = new Path2D();
      circle.arc(keypoint.x, keypoint.y, params.DEFAULT_RADIUS + 1, 0, 2 * Math.PI);
      this.ctx.fill(circle);
      this.ctx.stroke(circle);
    }
  }

  /**
   * Draw the skeleton of a body on the video.
   * @param keypoints A list of keypoints.
   */
  // drawSkeleton(keypoints, poseId) {
  //   // Each poseId is mapped to a color in the color palette.
  //   const color =
  //     params.STATE.modelConfig.enableTracking && poseId != null
  //       ? COLOR_PALETTE[poseId % 20]
  //       : "White";
  //   this.ctx.fillStyle = color;
  //   this.ctx.strokeStyle = color;
  //   this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH + 2;

  //   let lh_angle = getAngle(keypoints[23], keypoints[11], keypoints[13])
  //   let rh_angle = getAngle(keypoints[24], keypoints[12], keypoints[14])

  //   posedetection.util
  //     .getAdjacentPairs(params.STATE.model)
  //     .forEach(([i, j]) => {
  //       const kp1 = keypoints[i];
  //       const kp2 = keypoints[j];

  //       if(visibleCoords({ 0: { keypoints } }) === 1)
  //       {

  //         if(i === 11 || i === 12)
  //         {
  //           if(lh_angle < 60 || rh_angle < 60)
  //           {
  //             this.ctx.strokeStyle = 'red'

  //             if(lh_angle >= 60 && i === 11)
  //             {
  //               this.ctx.strokeStyle = color
  //             }

  //             if(rh_angle >= 60 && (i === 12 || (i === 11 && j === 12)))
  //             {
  //               this.ctx.strokeStyle = color
  //             }
  //           } else
  //           {
  //             this.ctx.strokeStyle = color
  //           }
  //         } else
  //         {
  //           this.ctx.strokeStyle = color
  //         }

  //       }

  //       // If score is null, just show the keypoint.
  //       const score1 = kp1.score != null ? kp1.score : 1;
  //       const score2 = kp2.score != null ? kp2.score : 1;
  //       const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0;

  //       if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
  //         this.ctx.beginPath();
  //         this.ctx.moveTo(kp1.x, kp1.y);
  //         this.ctx.lineTo(kp2.x, kp2.y);
  //         this.ctx.stroke();
  //       }
  //     });
  // }

  drawKeypoints3D(keypoints) {
    const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0;
    const pointsData = keypoints.map((keypoint) => [
      -keypoint.x,
      -keypoint.y,
      -keypoint.z,
    ]);

    const dataset = new scatter.ScatterGL.Dataset([
      ...pointsData,
      ...ANCHOR_POINTS,
    ]);

    // const keypointInd = posedetection.util.getKeypointIndexBySide(
    //   params.STATE.model
    // );
    this.scatterGL.setPointColorer((i) => {
      if (keypoints[i] == null || keypoints[i].score < scoreThreshold) {
        // hide anchor points and low-confident points.
        return "#ffffff";
      }
      if (i === 0) {
        return "#ff0000" /* Red */;
      }
      if (keypointInd.left.indexOf(i) > -1) {
        return "#00ff00" /* Green */;
      }
      if (keypointInd.right.indexOf(i) > -1) {
        return "#ffa500" /* Orange */;
      }
    });

    if (!this.scatterGLHasInitialized) {
      this.scatterGL.render(dataset);
    } else {
      this.scatterGL.updateDataset(dataset);
    }
    // const connections = posedetection.util.getAdjacentPairs(params.STATE.model);
    // const sequences = connections.map((pair) => ({ indices: pair }));
    this.scatterGL.setSequences(sequences);
    this.scatterGLHasInitialized = true;
  }
}

// [[0,1],[0,4],[1,2],[2,3],[3,7],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[11,23],[12,14],[14,16],[12,24],[13,15],[15,17],[16,18],[16,20],[15,17],[15,19],[15,21],[16,22],[17,19],[18,20],[23,25],[23,24],[24,26],[25,27],[26,28],[27,29],[28,30],[27,31],[28,32],[29,31],[30,32]]
