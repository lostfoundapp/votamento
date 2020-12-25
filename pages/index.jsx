import React, { useState, useEffect } from 'react';
import FileBase64 from 'react-file-base64';
import swal from 'sweetalert';
import { MdPlayCircleFilled, MdStop } from 'react-icons/md';

const IndexPage = () => {
  const [filess, setFiles] = useState([])
  let recorder, stream;
  let x = -1;
  const getFiles = files => {

    let imagess = []
    if (files.length <= 10) {
      files.map((file, idx) => {
        imagess.push({ image: file.base64 })
      })
      setFiles(imagess)
    } else {
      swal("OPS...", `Você ultrapassou o número máximo de imagens, escolha até 10 imagens`, "info")
    }

  }

  function displayNextImage() {
    x = (x === filess.length - 1) ? 0 : x + 1;
    var img = document.getElementById("img");
    fadeIn("img", 100);
    img.src = filess[x].image;
  }

  function startTimer() {
    setInterval(displayNextImage, 3000);
  }

  function fadeIn(elementId, miliseconds) {
    var el = document.getElementById(elementId);
    el.style.opacity = 0;
    var op = parseFloat(0);

    var timer = setInterval(function () {
      if (op >= 1.0)
        clearInterval(timer);

      op += 0.1;
      el.style.opacity = op;
    }, miliseconds);
  }

  function bubbles() {
    let count = 200
    let section = document.querySelector('section')
    let i = 0
    while (i < count) {
      let bubble = document.createElement('i')
      let wx = Math.floor(Math.random() * window.innerWidth)
      let wy = Math.floor(Math.random() * window.innerHeight)

      let size = Math.random() * 10
      bubble.style.left = `${wx}px`
      bubble.style.top = `${wy}px`
      bubble.style.width = `${1 + size}px`
      bubble.style.height = `${1 + size}px`

      bubble.style.animationDuration = `${5 + size}s`
      bubble.style.animationDelay = `${-size}s`

      section.appendChild(bubble)
      i++
    }
  }

  async function startRecording() {
    const video = document.querySelector("video");

    stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" }
    });
    recorder = new MediaRecorder(stream);

    const chunks = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = e => {
      const completeBlob = new Blob(chunks, { type: chunks[0].type });
      video.src = URL.createObjectURL(completeBlob);

    };

    recorder.start();
    document.getElementById("stop").style.display = ''
    document.getElementById("start").style.display = 'none'

  }

  async function stopRecording() {
    document.getElementById("stop").style.display = 'none'
    document.getElementById("start").style.display = ''
    document.getElementById("bx-natalino").style.display = 'none'
    recorder.stop();
    stream.getVideoTracks()[0].stop();
  }

  useEffect(() => {
    bubbles()
    if (filess.length > 0) {
      startTimer();
      document.getElementById("stop").style.display = 'none'
    }
  }, [filess])

  return (
    <>
      <section id="bx-natalino">
        {filess.length <= 0 &&
          <FileBase64
            multiple={true}
            onDone={(e) => getFiles(e)} />
        }
        {filess.length > 0 &&
          <>
            <h2>Feliz Natal</h2>
            <div className="box">
              <div className="img-box">

                <img
                  id="img"
                  className={`img-natal-0`}
                  src="https://image.freepik.com/vetores-gratis/texto-de-caligrafia-de-natal-feliz-em-portugues-feliz-natal_1095-944.jpg"
                />
              </div>
            </div>
          </>
        }
      </section>
      <section id="vd-natalino">
        {filess.length > 0 &&
          <video autoPlay />
        }
      </section>
      {filess.length > 0 &&
        <>
          <div className="btns">
            <MdPlayCircleFilled
              id="start"
              color="#fff"
              size={40}
              onClick={() => startRecording()}
              className="btn"
            />
            <MdStop
              id="stop"
              color="#fff"
              size={50}
              onClick={() => stopRecording()}
              className="btn" />
          </div>

        </>
      }
    </>
  )
}

export default IndexPage;
