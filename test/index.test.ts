import { expect, test } from "vitest"
import { getPlayerResponse, getSCVideoURL, getStreamURL, getVideoURL } from "../src/index"

const VIDEO_ID = "jNQXAC9IVRw"
const SC_VIDEO_ID = "dQw4w9WgXcQ"

test("getPlayerResponse", async () => {
  const pr = await getPlayerResponse(VIDEO_ID)
  const playerResponse = pr.playerResponse as any
  expect(playerResponse?.playabilityStatus?.status).toBe("OK")
})

test("getURL", async () => {
  const { playerResponse, basejsURL } = await getPlayerResponse("jNQXAC9IVRw")
  const formats = playerResponse?.streamingData?.formats
  const url = formats?.at(-1)?.url

  expect(formats && url).toBeTruthy()
  if (!url) throw new Error("url is undefined")

  const videoURL = await getVideoURL(url, basejsURL)
  expect(videoURL.search(/^https:\/\/[^.]*\.googlevideo\.com/) > -1).toBe(true)

  const resp = await fetch(videoURL, { method: "HEAD" })
  expect(resp.status).toBe(200)
})

test("getSCURL", async () => {
  const { playerResponse, basejsURL } = await getPlayerResponse(SC_VIDEO_ID)
  const formats = playerResponse?.streamingData?.formats
  const signatureCipher = formats?.at(-1)?.signatureCipher

  expect(formats && signatureCipher).toBeTruthy()
  if (!signatureCipher) throw new Error("signatureCipher is undefined")

  const videoURL = await getSCVideoURL(signatureCipher, basejsURL)
  expect(videoURL).toBeTruthy()
  if (!videoURL) throw new Error("videoURL is undefined")
  expect(videoURL.search(/^https:\/\/[^.]*\.googlevideo\.com/) > -1).toBe(true)

  const resp = await fetch(videoURL, { method: "HEAD" })
  expect(resp.status).toBe(200)
})

test("getStreamURL", async () => {
  const { playerResponse, basejsURL } = await getPlayerResponse(VIDEO_ID)
  const adaptiveFormats = playerResponse?.streamingData?.adaptiveFormats
  const format = adaptiveFormats?.at(-1)

  expect(adaptiveFormats && format).toBeTruthy()
  if (!format) throw new Error("format is undefined")

  const videoURL = await getStreamURL(format, basejsURL)
  if (!videoURL) throw new Error("videoURL is undefined")
  expect(videoURL?.search(/^https:\/\/[^.]*\.googlevideo\.com/) > -1).toBe(true)

  const resp = await fetch(videoURL, { method: "HEAD" })
  expect(resp.status).toBe(200)
})