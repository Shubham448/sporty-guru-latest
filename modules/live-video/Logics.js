// export const visibility = (poses) => {

//     // console.log(poses[0] != undefined && poses[0].keypoints)

//     var score = 0

//     poses[0] != undefined && poses[0].keypoints.map((value) => {

//         value.score > 0.5 && score++

//         return value

//     })

//     // console.log(score)

//     return score/33

// }

// export const getAngle = (firstPoint, midPoint, lastPoint) => {

//     if(firstPoint.score <= 0.5 && midPoint.score <= 0.5 && lastPoint.score <= 0.5)
//     {
//         return
//     }

//     var result = (Math.atan2(lastPoint.y - midPoint.y, lastPoint.x - midPoint.x) - Math.atan2(firstPoint.y - midPoint.y, firstPoint.x - midPoint.x))*180/Math.PI
        
//     result = Math.abs(result)

//     if (result > 180) {

//         result = 360.0 - result

//     }

//     return result

// }

// export const getAngleZ = (firstPoint, midPoint, lastPoint) => {

//     const a = [ firstPoint.x, firstPoint.y, firstPoint.z ]
//     const b = [ midPoint.x, midPoint.y, midPoint.z ]
//     const c = [ lastPoint.x, lastPoint.y, lastPoint.z ]

//     const ab = a.map((v, i) => v - b[i])

//     const cb = c.map((v, i) => v - b[i])

//     const dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

//     const mag1 = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2])

//     const mag2 = Math.sqrt(cb[0] * cb[0] + cb[1] * cb[1] + cb[2] * cb[2])

//     const cos_angle = dot(ab, cb)/(mag1*mag2)

//     var angle = Math.acos(cos_angle)

//     angle = Math.abs(angle*180/Math.PI)

//     if(angle > 180)
//     {
//         angle = 360 - angle
//     }

//     return angle

// }

// export const visibleCoords = (poses) => {

//     var score = 0

//     if(poses.poseLandmarks[0].visibility > 0.5)
//     {
//         score++
//     }
    
//     if(poses.poseLandmarks[11].visibility > 0.5 || poses.poseLandmarks[12].visibility > 0.5)
//     {
//         score++
//     }
    
//     if(poses.poseLandmarks[13].visibility > 0.5 || poses.poseLandmarks[14].visibility > 0.5)
//     {
//         score++
//     }
    
//     if(poses.poseLandmarks[15].visibility > 0.5 || poses.poseLandmarks[16].visibility > 0.5)
//     {
//         score++
//     }
    
//     if(poses.poseLandmarks[23].visibility > 0.5 || poses.poseLandmarks[24].visibility > 0.5)
//     {
//         score++
//     }
    
//     if(poses.poseLandmarks[25].visibility > 0.5 || poses.poseLandmarks[26].visibility > 0.5)
//     {
//         score++
//     }
    
//     if(poses.poseLandmarks[27].visibility > 0.5 || poses.poseLandmarks[28].visibility > 0.5)
//     {
//         score++
//     }

//     return (score)/7
// }

// function crossProduct(a, b)
// {
//     cross_P[0] = a[1] * b[2] - a[2] * b[1];
//     cross_P[1] = a[2] * b[0] - a[0] * b[2];
//     cross_P[2] = a[0] * b[1] - a[1] * b[0];
// }

const normal = (firstPoint, midPoint, lastPoint) => {
    const a = [ firstPoint.x, firstPoint.y, firstPoint.z ]
    const b = [ midPoint.x, midPoint.y, midPoint.z ]
    const c = [ lastPoint.x, lastPoint.y, lastPoint.z ]

    const ab = a.map((v, i) => v - b[i])

    const cb = c.map((v, i) => v - b[i])

    const cross_product = (a, b) => (
        [ (a[1] * b[2]) - (a[2] * b[1]), (a[2] * b[0]) - (a[0] * b[2]), (a[0] * b[1]) - (a[1] * b[0]) ]
    )

    const mag1 = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2])

    const mag2 = Math.sqrt(cb[0] * cb[0] + cb[1] * cb[1] + cb[2] * cb[2])

    var prod = cross_product(cb, ab)

    const x = (Math.acos(prod[0]/(mag1*mag2)))*180/Math.PI
    const y = (Math.acos(prod[1]/(mag1*mag2)))*180/Math.PI
    const z = (Math.acos(prod[2]/(mag1*mag2)))*180/Math.PI

    return [ Math.round(x), Math.round(y), Math.round(z) ]
}

export const facing = (keypoints) => {
    const rsx = keypoints[12].x
    const lsx = keypoints[11].x

    const rsz = keypoints[12].z
    const lsz = keypoints[11].z

    const score_rs = keypoints[12].score
    const score_ls = keypoints[11].score

    // const norm = normal(keypoints[12], keypoints[11], keypoints[23])

    if(score_rs > 0.9 && score_ls > 0.9)
    {
        if(rsx < lsx)
        {
            if(lsx - rsx > 150)
            {
                return 'front'
            } else
            {
                if(Math.round((rsz - lsz)*1000) > 0)
                {
                    return 'right'
                } else
                {
                    return 'left'
                }
            }
        } else
        {
            return 'back'
        }
    } else
    {
        return 'Not visible'
    }
}
