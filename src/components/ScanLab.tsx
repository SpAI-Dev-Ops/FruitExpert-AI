import React, { useState, useRef, useEffect } from "react";
import { Upload, Camera, Image as ImageIcon, X, AlertCircle, RefreshCw, Info } from "lucide-react";
import { sampleFruits } from "../sampleData";
import { sampleFruitsBn } from "../sampleDataBn";
import { Language, translations } from "../i18n";

interface ScanLabProps {
  onAnalyze: (payload: { imageBase64?: string; mimeType?: string; presetKey?: string }) => void;
  isAnalyzing: boolean;
  hasApiKey: boolean;
  resetSignal?: number;
  lang: Language;
}

const SCANNING_MESSAGES_EN = [
  "Detecting skin texture and fruit morphology...",
  "Analyzing visual pigments and chlorophyll profile...",
  "Comparing botanical matches against taxological databases...",
  "Calculating confidence metrics and size ratio...",
  "Retrieving regional production & agricultural statistics...",
  "Assembling vitamin & nutrient concentration profiles...",
  "Synthesizing climate conditions & horticultural tips..."
];

const SCANNING_MESSAGES_BN = [
  "ফলের খোসার গঠন এবং বাহ্যিক রূপ সনাক্ত করা হচ্ছে...",
  "ভিজ্যুয়াল পিগমেন্ট এবং ক্লোরোফিল প্রোফাইল বিশ্লেষণ করা হচ্ছে...",
  "উদ্ভিদবিজ্ঞানের মিল ট্যাক্সোলজিক্যাল ডেটাবেসের সাথে তুলনা করা হচ্ছে...",
  "আত্মবিশ্বাসের মাত্রা এবং আকারের অনুপাত গণনা করা হচ্ছে...",
  "আঞ্চলিক উৎপাদন এবং কৃষি পরিসংখ্যান পুনরুদ্ধার করা হচ্ছে...",
  "ভিটামিন এবং পুষ্টির ঘনত্বের প্রোফাইল একত্রিত করা হচ্ছে...",
  "জলবায়ু পরিস্থিতি এবং উদ্যানপালন টিপস সংশ্লেষণ করা হচ্ছে..."
];

export default function ScanLab({ onAnalyze, isAnalyzing, hasApiKey, resetSignal = 0, lang }: ScanLabProps) {
  const [dragOver, setDragOver] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [streamActive, setStreamActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState<string | null>(null);
  const [capturedPreview, setCapturedPreview] = useState(false);
  
  const t = translations[lang];
  const scanningMessages = lang === "bn" ? SCANNING_MESSAGES_BN : SCANNING_MESSAGES_EN;
  
  const [loaderMessage, setLoaderMessage] = useState(scanningMessages[0]);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [labError, setLabError] = useState<string | null>(null);
  const [permissionState, setPermissionState] = useState<string>("unknown");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Sync initial message on language toggle
  useEffect(() => {
    setLoaderMessage(scanningMessages[0]);
  }, [lang]);

  // External reset trigger
  useEffect(() => {
    if (resetSignal > 0) {
      clearSelectedImage();
    }
  }, [resetSignal]);

  // Rotate scanner messages
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnalyzing) {
      let idx = 0;
      setLoaderMessage(scanningMessages[0]);
      interval = setInterval(() => {
        idx = (idx + 1) % scanningMessages.length;
        setLoaderMessage(scanningMessages[idx]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing, lang]);

  // Query camera permission state dynamically
  useEffect(() => {
    let active = true;
    let queryResult: PermissionStatus | null = null;
    
    const handleChange = () => {
      if (active && queryResult) {
        setPermissionState(queryResult.state);
      }
    };

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "camera" as any })
        .then((result) => {
          if (!active) return;
          queryResult = result;
          setPermissionState(result.state);
          result.addEventListener("change", handleChange);
        })
        .catch((err) => {
          console.log("Permission query unsupported:", err);
          if (active) setPermissionState("unsupported");
        });
    } else {
      setPermissionState("unsupported");
    }

    return () => {
      active = false;
      if (queryResult) {
        queryResult.removeEventListener("change", handleChange);
      }
    };
  }, []);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const processFile = (file: File) => {
    setLabError(null);
    
    // 1. Verify file exists
    if (!file) {
      setLabError("No file selected.");
      return;
    }

    // 2. Validate common image formats
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedMimeTypes.includes(file.type) && !file.type.startsWith("image/")) {
      setLabError("Unsupported file type. Please upload a JPEG, PNG, WebP, or GIF image.");
      return;
    }

    // 3. Enforce 10MB size limit (matching standard server limits)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      setLabError("The image file is too large. Maximum size allowed is 10MB.");
      return;
    }

    // 4. Ensure file is not empty/corrupted (0 bytes)
    if (file.size === 0) {
      setLabError("The selected file is empty and cannot be analyzed.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      
      // 5. Ensure the base64 conversion is clean and complete
      if (!base64 || !base64.startsWith("data:image/") || base64.length < 100) {
        setLabError("The image data is corrupted or could not be loaded correctly.");
        return;
      }

      setSelectedImage(base64);
      setSelectedMimeType(file.type);
      setCapturedPreview(false); // marked as uploaded, not captured
      stopCamera();
    };

    reader.onerror = () => {
      setLabError("An error occurred while reading the image file.");
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Camera Functions
  const startCamera = async () => {
    setCameraError(null);
    setLabError(null);
    setCameraLoading(true);
    setCameraActive(true);
    setStreamActive(false);

    // Stop any previous MediaStream before requesting a new one
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {}
      });
      streamRef.current = null;
    }

    // Give React render a small tick to mount the video element before binding stream
    await new Promise((resolve) => setTimeout(resolve, 60));

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("BrowserMediaAPIUnsupported");
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (innerErr) {
        console.warn("Retrying camera acquisition with simplified constraints:", innerErr);
        // Fallback to simpler constraints if environment camera resolution is overconstrained
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().catch((err) => {
              console.warn("Video play promise error:", err);
            });
          }
        };

        // Try playing immediately
        await videoRef.current.play().catch(() => {});
        setStreamActive(true);
      }
    } catch (err: any) {
      const errName = err.name || "";
      const errMsg = err.message || String(err);
      
      const isPermissionDenied = 
        errName === "NotAllowedError" || 
        errName === "PermissionDeniedError" ||
        errMsg.toLowerCase().includes("permission") ||
        errMsg.toLowerCase().includes("dismissed") ||
        errMsg.toLowerCase().includes("denied");

      if (isPermissionDenied) {
        console.warn("Camera acquisition status (Permission dismissed or denied):", err);
      } else {
        console.warn("Camera acquisition failed:", err);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          try {
            track.stop();
          } catch (e) {}
        });
        streamRef.current = null;
      }
      setStreamActive(false);

      if (isPermissionDenied) {
        setCameraError("Camera permission was dismissed or denied. Browser camera permission must be allowed to utilize the Live Camera. Please click allow when prompted or change your browser settings to grant camera permission.");
      } else if (errName === "NotFoundError" || errName === "DevicesNotFoundError") {
        setCameraError("No camera was detected on this device.");
      } else if (errName === "NotReadableError" || errName === "TrackStartError" || errMsg.toLowerCase().includes("readable")) {
        setCameraError("The camera is currently being used by another application or tab.");
      } else if (errName === "SecurityError") {
        setCameraError("Camera access is blocked by the current browser security settings.");
      } else if (errName === "BrowserMediaAPIUnsupported") {
        if (!window.isSecureContext) {
          setCameraError("Camera access is blocked because the preview/iframe environment is not loaded over HTTPS (Secure Context required).");
        } else {
          setCameraError("Your browser or preview container does not support media capture APIs.");
        }
      } else {
        setCameraError(`Camera acquisition failed (${errName || "Error"}). Please ensure camera access is enabled in your device settings.`);
      }
    } finally {
      setCameraLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {
          console.warn("Error stopping track:", e);
        }
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      try {
        videoRef.current.onloadedmetadata = null;
        videoRef.current.srcObject = null;
      } catch (e) {}
    }
    setStreamActive(false);
    setCameraActive(false);
    setCameraError(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && streamActive) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 1280;
      canvas.height = videoRef.current.videoHeight || 720;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setSelectedImage(dataUrl);
        setSelectedMimeType("image/jpeg");
        setCapturedPreview(true);
        stopCamera();
      }
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setSelectedMimeType(null);
    setLabError(null);
    setCapturedPreview(false);
  };

  const triggerAnalysis = () => {
    if (selectedImage && selectedMimeType) {
      onAnalyze({
        imageBase64: selectedImage,
        mimeType: selectedMimeType
      });
    }
  };

  const triggerPresetAnalysis = (key: string, imgUrl: string) => {
    setSelectedImage(imgUrl);
    setSelectedMimeType("image/jpeg");
    setCapturedPreview(false);
    stopCamera();
    onAnalyze({ presetKey: key });
  };

  // Stop camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          try {
            track.stop();
          } catch (e) {}
        });
        streamRef.current = null;
      }
      if (videoRef.current) {
        try {
          videoRef.current.onloadedmetadata = null;
          videoRef.current.srcObject = null;
        } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col space-y-6 h-full text-white">
      <div>
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <span className="text-orange-500">🔬</span> {t.scanLabTitle}
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {t.scanLabSubtitle}
        </p>
      </div>

      {/* Main interaction display */}
      <div className="relative flex-1 min-h-[350px] bg-slate-950/40 border-2 border-dashed border-slate-800 rounded-xl overflow-hidden flex flex-col items-center justify-center transition-all">
        {isAnalyzing ? (
          // Analysis Loader State
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10">
            {selectedImage && (
              <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-md mb-6 border border-slate-800">
                <img src={selectedImage} alt="Scanning" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                {/* Glowing laser scan bar */}
                <div className="absolute left-0 right-0 h-1 bg-orange-500 shadow-[0_0_12px_#f97316] animate-laser-scan"></div>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              <h3 className="text-base font-bold text-white animate-pulse">{t.scanningStatus}</h3>
            </div>
            <p className="text-xs text-slate-400 max-w-xs mt-3 h-10 transition-all font-medium">
              {loaderMessage}
            </p>
          </div>
        ) : null}

        {cameraActive ? (
          // Live Webcam Stream Viewport
          <div className="relative w-full h-full min-h-[350px] flex flex-col justify-between p-4 bg-black overflow-hidden rounded-xl touch-action-none">
            {cameraLoading ? (
              <div className="absolute inset-0 bg-slate-950/90 z-20 flex flex-col items-center justify-center p-6 text-center">
                <RefreshCw className="h-8 w-8 text-orange-500 animate-spin mb-3" />
                <p className="text-xs font-semibold text-slate-300">{lang === "bn" ? "ক্যামেরা ফিড চালু হচ্ছে..." : "Initializing camera feed..."}</p>
              </div>
            ) : null}

            {cameraError ? (
              <div className="absolute inset-0 bg-slate-950/95 z-20 flex flex-col items-center justify-center p-6 text-center space-y-4 overflow-y-auto">
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 border border-red-500/20">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div className="space-y-1.5 max-w-xs">
                  <h4 className="text-xs font-bold text-red-400">{lang === "bn" ? "ক্যামেরা অ্যাক্সেস বন্ধ করা হয়েছে" : "Camera Access Prevented"}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {cameraError}
                  </p>
                </div>

                {/* Secure context & diagnostic report inside the error box */}
                <div className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-left text-[10px] space-y-1 font-mono text-slate-400">
                  <div className="text-red-400 font-bold uppercase mb-1">{lang === "bn" ? "ডায়াগনস্টিক রিপোর্ট:" : "Diagnostic Report:"}</div>
                  <div>• {lang === "bn" ? "নিরাপদ সংযোগ (HTTPS):" : "Secure Context (HTTPS):"} {window.isSecureContext ? "Yes" : "No (Blocked)"}</div>
                  <div>• {lang === "bn" ? "ব্রাউজার মিডিয়া এপিআই:" : "Browser Media API:"} {navigator.mediaDevices ? "Available" : "Not Found"}</div>
                  <div>• {lang === "bn" ? "অনুমতির অবস্থা:" : "Permission State:"} {permissionState}</div>
                  <div>• {lang === "bn" ? "এনভায়রনমেন্ট:" : "Environment:"} {window.parent !== window ? "Iframe Container" : "Top Level window"}</div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startCamera}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    {lang === "bn" ? "আবার চেষ্টা করুন" : "Try Camera Again"}
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold py-2 px-4 rounded-lg transition-all cursor-pointer"
                  >
                    {lang === "bn" ? "ক্যামেরা বন্ধ করুন" : "Close Camera"}
                  </button>
                </div>
              </div>
            ) : null}

            {/* Video preview container inside visible viewport */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
              autoPlay
              playsInline
              muted
            />

            {/* Scanning graphic focus targets */}
            <div className="absolute inset-0 border-[3px] border-orange-500/10 pointer-events-none rounded-lg" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-dashed border-orange-500/20 rounded-full pointer-events-none flex items-center justify-center">
              <div className="w-3.5 h-3.5 border border-orange-500/30 rounded-full bg-orange-500/10" />
            </div>

            {/* Frame Toolbar */}
            <div className="relative flex items-center justify-between z-10">
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded border border-emerald-500/30 backdrop-blur-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                {lang === "bn" ? "লাইভ ক্যামেরা সক্রিয়" : "Live Camera active"}
              </span>
              <button
                onClick={stopCamera}
                className="bg-black/60 hover:bg-black/85 text-white p-2 rounded-full backdrop-blur-sm transition-all border border-slate-800 cursor-pointer"
                title={lang === "bn" ? "ক্যামেরা বন্ধ করুন" : "Close Camera"}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Bottom visual overlay & controls */}
            <div className="relative mt-auto z-10 space-y-3 pt-4 bg-gradient-to-t from-black via-black/80 to-transparent p-2 rounded-b-lg">
              {/* Visual diagnostics block */}
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-2.5 text-[10px] space-y-1 font-mono text-slate-400">
                <div className="font-bold uppercase tracking-wider text-orange-500 mb-1 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                  {lang === "bn" ? "ক্যামেরা সিস্টেম ডায়াগনস্টিকস" : "Camera System Diagnostics"}
                </div>
                <div className="flex justify-between">
                  <span>{lang === "bn" ? "নিরাপদ সংযোগ (HTTPS):" : "Secure Context (HTTPS):"}</span>
                  <span className={window.isSecureContext ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                    {window.isSecureContext ? "YES" : "NO (Blocked)"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === "bn" ? "ব্রাউজার মিডিয়া এপিআই:" : "Browser Media API:"}</span>
                  <span className={navigator.mediaDevices ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                    {navigator.mediaDevices ? "AVAILABLE" : "UNSUPPORTED"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === "bn" ? "সক্রিয় স্ট্রিম:" : "Active Stream:"}</span>
                  <span className={streamRef.current ? "text-emerald-400 font-bold" : "text-slate-500"}>
                    {streamRef.current ? "ACTIVE TRACKS" : "OFFLINE"}
                  </span>
                </div>
              </div>

              {/* Large touch capture button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={capturePhoto}
                  disabled={!streamActive}
                  className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer text-xs"
                >
                  <Camera className="h-4.5 w-4.5" />
                  {t.capturePhoto}
                </button>
              </div>
            </div>
          </div>
        ) : selectedImage ? (
          // Captured / Uploaded Image Preview
          <div className="relative w-full h-full min-h-[350px] flex flex-col justify-between p-4 bg-slate-950/20 rounded-xl">
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <img
                src={selectedImage}
                alt="Selected fruit spec"
                className="max-h-[250px] max-w-full rounded-lg object-contain shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>
            <button
              onClick={clearSelectedImage}
              className="absolute top-4 right-4 bg-slate-900/95 hover:bg-slate-800 text-slate-300 hover:text-white p-2 rounded-full shadow-md transition-all z-10 border border-slate-700 cursor-pointer"
              title={lang === "bn" ? "ছবি মুছুন" : "Remove Image"}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative flex-1" />
            <div className="relative flex flex-col sm:flex-row gap-2.5 w-full justify-center pb-2 z-10">
              {capturedPreview && (
                <button
                  type="button"
                  onClick={() => {
                    clearSelectedImage();
                    startCamera();
                  }}
                  className="bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold py-2.5 px-5 rounded-xl transition-all cursor-pointer text-xs"
                >
                  {t.retake}
                </button>
              )}
              <button
                type="button"
                onClick={triggerAnalysis}
                className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-orange-500/20 transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5"
              >
                <span>{t.analyzeSpecimen}</span>
              </button>
            </div>
          </div>
        ) : (
          // Default Upload Option Area
          <div
            className={`w-full h-full flex flex-col items-center justify-center p-6 text-center ${
              dragOver ? "bg-orange-500/10 border-orange-500" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            
            <div className="w-14 h-14 bg-slate-800 text-orange-500 rounded-2xl flex items-center justify-center mb-4 border border-slate-700">
              <Upload className="h-6 w-6" />
            </div>

            <h3 className="text-sm font-bold text-slate-200">{t.dragDropPrompt}</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
              {t.supportedFormats}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold py-2 px-4 rounded-xl border border-slate-700 shadow-sm text-xs transition-all cursor-pointer"
              >
                {t.chooseFile}
              </button>
              <button
                onClick={startCamera}
                className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold py-2 px-4 rounded-xl shadow-sm text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Camera className="h-4 w-4" />
                {t.liveCamera}
              </button>
            </div>

            {labError && (
              <div className="mt-4 flex items-center gap-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg p-2 max-w-xs mx-auto text-xs text-left">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <span>{labError}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sandbox mode notice */}
      {!hasApiKey && !selectedImage && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
          <div className="text-[11px] text-amber-400 leading-relaxed">
            <strong>{lang === "bn" ? "স্যান্ডবক্স মোড সক্রিয়:" : "Sandbox Mode Active:"}</strong> {t.sandboxWarning}
          </div>
        </div>
      )}

      {/* Preset fruit samples section */}
      <div className="border-t border-slate-800 pt-5">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
          {t.presetTitle}
        </h3>
        <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
          {Object.entries(sampleFruits).map(([key, fruit]) => {
            const localizedFruitName = lang === "bn" ? sampleFruitsBn[key]?.commonName : fruit.commonName;
            return (
              <button
                key={key}
                onClick={() => triggerPresetAnalysis(key, fruit.image)}
                className="flex flex-col items-center group space-y-1.5 focus:outline-none cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-slate-800 group-hover:border-orange-500 shadow-sm group-hover:scale-110 active:scale-95 transition-all duration-200">
                  <img
                    src={fruit.image}
                    alt={localizedFruitName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[9px] font-semibold text-slate-400 group-hover:text-orange-400 text-center truncate w-full max-w-[64px]">
                  {localizedFruitName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
