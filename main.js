/**
 * 1. Render Songs --> OK
 * 2. Scroll top --> OK
 * 3. Play / pause / seek -->  OK
 * 4. CD rotate --> OK
 * 5. Next / prev --> OK
 * 6. Random --> OK
 * 7. Next / Repeat when ended --> OK
 * 8. Active song --> OK
 * 9. Scroll active song into view --> OK
 * 10. Play song when click --> OK
 */


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// const PLAYER_STORAGE_KEY = "Ơi! anh Chung đây"

const cd = $('.cd-thumb')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const pausing = $('.pause')
const playing = $('.play')
const repeatBtn = $('.btn-repeat')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const progress = $('#progress')
const randomBtn = $('.btn-random')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    // config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    songs: [
        {
            name: 'can bao nhieu tien doi mot mo binh yen',
            singer: 'huh',
            path: './assets/Songs/y2mate.com - bao tiền một mớ bình yên  14 Casper  Bon Nghiêm Official Track 09  Album SỐ KHÔNG.mp3',
            image: './assets/Images/can_bao_nhieu_tien_doi_mo_binh_yen.jpg'
        },
        {
            name: 'tại vì sao',
            singer: 'MCK ft Limitlxss',
            path: './assets/Songs/y2mate.com - TẠI VÌ SAO RMX  RPT MCK ft Limitlxss  OFFICIAL LYRIC VIDEO.mp3',
            image: './assets/Images/tai_vi_sao.jpg'
        },
        {
            name: 'Khi mà',
            singer: 'RONBOOGZ',
            path: './assets/Songs/y2mate.com - KHI MÀ  RONBOOGZ Official.mp3',
            image: './assets/Images/khi_ma.jpg'
        },
        {
            name: 'Anh muốn mình như con thuyền kia',
            singer: 'Ngắn ft Mhee',
            path: './assets/Songs/y2mate.com - Anh muốn mình như con thuyền kia  Ngắn ft Mhee MV.mp3',
            image: './assets/Images/anh_muon_minh_nhu_con_thuyen_kia.jpg'
        },
        {
            name: 'VÂN DUNG',
            singer: 'GRILL ft ORIJINN',
            path: './assets/Songs/y2mate.com - GILL RPT ORIJINN  VÂN RUNG OFFICIAL VISUALIZER.mp3',
            image: './assets/Images/van_dung.jpg'
        },
        {
            name: 'Ánh sao và bầu trời',
            singer: 'TRI x Cá',
            path: './assets/Songs/y2mate.com - Ánh Sao Và Bầu Trời  TRI x Cá  Official Audio.mp3',
            image: './assets/Images/anh_sao_va_bau_troi.jpg'
        },
        {
            name: 'Nhu Anh Da Thay Em',
            singer: 'PhucXP ft Freak',
            path: './assets/Songs/y2mate.com - Như Anh Đã Thấy Em CTTDE2  PhucXp ft Freak D.mp3',
            image: './assets/Images/nhu_anh_da_thay_em.jpg'
        },
        {
            name: 'ANH KHÔNG THỀ GÌ ĐÂU ANH LÀM AKTGĐ',
            singer: 'PHÚC DU',
            path: './assets/Songs/y2mate.com - ANH KHÔNG THỀ GÌ ĐÂU ANH LÀM AKTGĐ  PHÚC DU OFFICIAL MUSIC VIDEO.mp3',
            image: './assets/Images/anh_khong_the_gi_dau_anh_lam.jpg'
        },
        {
            name: 'từ chối nhẹ nhàng thôi',
            singer: 'Phúc Du ft Bích Phương',
            path: './assets/Songs/y2mate.com - PHÚC DU feat BÍCH PHƯƠNG  từ chối nhẹ nhàng thôi Official MV.mp3',
            image: './assets/Images/tu_choi_nhe_nhang_thoi.jpg'
        },
        {
            name: 'NỤ HỒNG MONG MANH',
            singer: 'Jombie ft Mr Sâu x prod Tam Ke',
            path: './assets/Songs/y2mate.com - NỤ HỒNG MONG MANH  Rap Version  Jombie ft Mr Sâu x prod Tam Ke  G5R  MV.mp3',
            image: './assets/Images/nu_hong_mong_manh.jpg'
        },
        {
            name: 'Don\'t coi',
            singer: 'RONBOOGZ',
            path: './assets/Songs/y2mate.com - Dont Côi  x Ronboogz Visualizer.mp3',
            image: './assets/Images/don_coi.jpg'
        },
        {
            name: 'Ai là người thương em (Rap Version)',
            singer: 'PROD TAM KÊ',
            path: './assets/Songs/y2mate.com - Ai Là Người Thương Em  Rap Version  Spy Official Prod Tam Kê Mix.mp3',
            image: 'assets/Images/ver_rep_ai_la_nguoi_thuong_em.jpg'
        },
        {
            name: 'yêu anh đi mẹ anh bán bánh mì',
            singer: 'PHÚC DU',
            path: './assets/Songs/y2mate.com - PHÚC DU  yêu anh đi mẹ anh bán bánh mì MV OFFICIAL.mp3',
            image: 'assets/Images/yeu_anh_di_me_anh_ban_ban_mi.jpg'
        },
    ],

    // setConfig: function(key, value) {
    //     this.config[key] = value
    //     localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    // },  

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index ="${index}">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>

                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>

                <div class="option">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
             </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function () {
        const _this = this
        const cdWidth = cd.offsetWidth

        //Xử lý CD quay / dừng 
        const cdThumbAnimation = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ],
            {
                duration: 10000,
                iterations: Infinity
            })

        cdThumbAnimation.pause()

        // Xử lí phóng to thu nhỏ và làm mờ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.height = newCdWidth > 0 ? newCdWidth + 'px' : 0

            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xử lí khi click Play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // Khi song được play 
        audio.onplay = function () {
            _this.isPlaying = true
            pausing.style.display = 'block'
            playing.style.display = 'none'
            cdThumbAnimation.play()
        }

        // Khi song được pause
        audio.onpause = function () {
            _this.isPlaying = false
            pausing.style.display = 'none'
            playing.style.display = 'block'
            cdThumbAnimation.pause()
        }

        // Xử lí tiến độ bài hát
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const currentTime = audio.currentTime
                const duration = audio.duration
                const progressPercent = Math.floor((currentTime / duration) * 100)
                progress.value = progressPercent
            }
        }

        // Xử lý khi tua 
        progress.onchange = (e) => {
            const seekTime = (audio.duration / 100) * e.target.value
            audio.currentTime = seekTime
        }

        // Chuyển bài tiếp theo
        const nextNewSong = nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Quay lại bài trước đó
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Xử lí khi click random
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom
            // _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        //Xử lí khi repeat lại một bài hát
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat
            // _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Xử lý next song khi audio kết thúc
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
                _this.render()
                _this.scrollToActiveSong()
            } else {
                if (_this.isRandom) {
                    _this.randomSong()
                } else {
                    _this.nextSong()
                }
                audio.play()
                _this.render()
                _this.scrollToActiveSong()
            }
        }

        //Lắng nghe hành vi click vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            const optionNode = e.target.closest('.option')
            if (songNode || optionNode) {
                if (songNode) {
                    _this.currentIndex = parseInt(songNode.getAttribute('data-index'))
                    _this.loadCurrentSong()
                    _this.render()
                    _this.scrollToActiveSong()
                    audio.play()
                }

                if (optionNode) {
                    //nao nghĩ dc cái gì thì làm
                }
            }
        }
    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 500)
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    randomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()

    },

    start: function () {
        //định nghĩa các thuộc tính cho object
        this.defineProperties()

        // lắng nghe/ xử lý các sự kiện DOM events 
        this.handleEvents()

        //tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        //Render playlist
        this.render();
    }
}

app.start()
