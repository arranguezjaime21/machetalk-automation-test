export const callSettingsConfig = {

    disableVideoOnly: {
        buttonID: 'com.fdc_machetalk_broadcaster:id/rl_receiving_video_call',
        enableStatus: [
            "現在ビデオ・音声通話の受信がONになっています。"
        ],
        disableStatus: [
            "現在音声通話のみ受信がONになっています。",
            "ビデオ通話か音声通話の受信をONしてください。\nONにすると通話待機します。"
        ],
        currentStatus: "video call settings already turned off"

    },
    disableAudioVideo: {
        buttonID: 'com.fdc_machetalk_broadcaster:id/rl_receiving_video_and_voice_call',
        enableStatus: [
            "現在音声通話のみ受信がONになっています。",
            "現在ビデオ・音声通話の受信がONになっています。"
        ],
        disableStatus: [
            "ビデオ通話か音声通話の受信をONしてください。\nONにすると通話待機します。"
        ],
        currentStatus: "audio and video call settings already turned off"
    },

    enableAudioCall: {
        buttonID: 'com.fdc_machetalk_broadcaster:id/rl_receiving_voice_call',
        enableStatus: [
            "ビデオ通話か音声通話の受信をONしてください。\nONにすると通話待機します。"
        ],
        disableStatus: [
            "現在音声通話のみ受信がONになっています。",
            "現在ビデオ・音声通話の受信がONになっています。"
        ],
        currentStatus: "audio call settings already turned on"
    },

    enableAudioVideo: {
        buttonID: 'com.fdc_machetalk_broadcaster:id/rl_receiving_video_and_voice_call',
        enableStatus: [
            "現在音声通話のみ受信がONになっています。",
            "ビデオ通話か音声通話の受信をONしてください。\nONにすると通話待機します。"
        ],
        disableStatus: [
            "現在ビデオ・音声通話の受信がONになっています。"
        ],
        currentStatus: "audio and video call settings are already turned on"
    }
};