class NewsComp {
    constructor() {
        this.$ele = $('.component-news .news-list');
        this.newsList = this.$ele.data('newsList');
        this.$scrollContainer = this.$ele.find('.news-bd');
        this.timeout;
        this.index = 1;
        this.size;
        this.init();
    }

    init() {
        if(!!this.newsList && this.newsList.length > 1){
            this.size = this.newsList.length;
            this.$scrollContainer.height(58 * this.size);
            this.$ele.on('mouseenter', () => this.scrollClear());
            this.$ele.on('mouseleave', () => this.scrollAuto());
            this.scrollAuto();
        }
    }

    scrollAuto(){
        let self = this;
        this.scrollClear();
        this.timeout = setInterval(function(){
            self.$scrollContainer.stop();
            let h = 58 * self.index;
            self.$scrollContainer.animate({
                "top": `-${h}px`
            }, 300);
            if(self.index == self.size-1){
                self.index = 0;
            }
            else {
                self.index++;
            }
        }, 5000);
    }

    scrollClear(){
        if(!!this.timeout){
            clearTimeout(this.timeout);
        }
    }
}

module.exports = NewsComp;