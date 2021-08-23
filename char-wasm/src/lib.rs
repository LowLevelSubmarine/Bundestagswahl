use wasm_bindgen::prelude::*;

// Disable name warning
#[allow(non_snake_case)]
#[wasm_bindgen]
pub struct ViewDimensions {
    pub circleRadius: f64,

    pub xOffset: f64,
    pub yPaddingTop: f64,
    pub yPaddingBottom: f64,

    pub svgWidth: f64,
    pub svgHeight: f64,

    pub xMultiplier: f64,
    pub yMultiplier: f64,
}

#[allow(non_snake_case)]
#[wasm_bindgen]
impl ViewDimensions {
    pub fn new() -> ViewDimensions {
        let circleRadius = 4f64;
        ViewDimensions { circleRadius, xOffset: 150f64, yPaddingTop: circleRadius + 60f64, yPaddingBottom: circleRadius + 10f64, svgWidth: 0f64, svgHeight: 0f64, xMultiplier: 0f64, yMultiplier: 0f64 }
    }

    pub fn recalculateViewDimensions(&mut self) {
        self.xMultiplier = self.svgWidth - self.xOffset - self.circleRadius * 2f64;
        self.yMultiplier = self.svgHeight - self.yPaddingTop - self.yPaddingBottom;

        if self.xMultiplier < 0f64 {
            self.xMultiplier = 1f64;
        }
        if self.yMultiplier < 0f64 {
            self.yMultiplier = 1f64;
        }
    }

    pub fn getX(& mut self, point: f64) -> f64 {
        point * (self.xMultiplier) + (self.xOffset / 2f64)
    }

    pub fn getY(& mut self, point: f64) -> f64 {
        self.svgHeight - (point * self.yMultiplier) - self.yPaddingBottom
    }
}
