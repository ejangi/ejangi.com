const CachedArticle = ( () => {

    class CachedArticle {
        constructor() {
            this._storageAvailable = true

            if ( !this.storageAvailable('localStorage') ) {
                this._storageAvailable = false
                console.error( 'This browser does not support localStorage.' )
            }
        }

        setKey( key ) {
            this._key = key
        }

        getKey() {
            return this._key
        }

        setContent( content ) {
            this._content = content
        }

        getContent() {
            return this._content
        }

        save( key, content ) {
            if ( key !== undefined ) {
                this.setKey( key )
            }
            if ( content !== undefined ) {
                this.setContent( content )
            }

            if ( this._storageAvailable ) {
                return localStorage.setItem( this._key, this._content )
            }

            return false
        }

        retrieve( key ) {
            if ( key !== undefined ) {
                this.setKey( key )
            }

            if ( this._storageAvailable ) {
                this._content = localStorage.getItem( this._key )
                return this._content
            }

            return null;
        }

        storageAvailable( type ) {
            try {
                var storage = window[type],
                    x = '__storage_test__'
                storage.setItem(x, x)
                storage.removeItem(x)
                return true
            }
            catch(e) {
                return e instanceof DOMException && (
                    // everything except Firefox
                    e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === 'QuotaExceededError' ||
                    // Firefox
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                    // acknowledge QuotaExceededError only if there's something already stored
                    storage.length !== 0
            }
        }

    }

    return CachedArticle

} )()

export default CachedArticle