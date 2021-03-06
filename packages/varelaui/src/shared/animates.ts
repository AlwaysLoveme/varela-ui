/**
 * @doc 更多动画见：https://animate.style/ 此文件需要结合animate.css使用
 * @animates key: 入场动画
 * @animates value: 出场动画
 */
const animates: Record<string, string> = {
  scaleIn: "scaleOut",

  slideInUp: "slideOutDown",
  slideInDown: "slideOutUp",
  slideInLeft: "slideOutLeft",
  slideInRight: "slideOutRight",

  backInDown: "backOutDown",
  backInLeft: "backOutLeft",
  backInRight: "backOutRight",
  backInUp: "backOutUp",

  bounceInDown: "bounceOutUp",
  bounceInLeft: "bounceOutLeft",
  bounceInRight: "bounceOutRight",
  bounceInUp: "bounceOutUp",

  fadeIn: "fadeOut",
  fadeInDown: "fadeOutUp",
  fadeInDownBig: "fadeOutUpBig",
  fadeInLeft: "fadeOutLeft",
  fadeInLeftBig: "fadeOutLeftBig",
  fadeInRight: "fadeOutRight",
  fadeInRightBig: "fadeOutRightBig",
  fadeInUp: "fadeOutDown",
  fadeInUpBig: "fadeOutDownBig",
  fadeInTopLeft: "fadeOutTopLeft",
  fadeInTopRight: "fadeOutTopRight",
  fadeInBottomLeft: "fadeOutBottomLeft",
  fadeInBottomRight: "fadeOutBottomRight",

  flipInX: "flipOutX",
  flipInY: "flipOutY",

  lightSpeedInRight: "lightSpeedOutRight",
  lightSpeedInLeft: "lightSpeedOutLeft",

  rotateIn: "rotateOut",
  rotateInDownLeft: "rotateOutUpLeft",
  rotateInDownRight: "rotateOutUpRight",
  rotateInUpLeft: "rotateOutDownLeft",
  rotateInUpRight: "rotateOutDownRight",

  rollIn: "rollOut",

  zoomIn: "zoomOut",
  zoomInDown: "zoomOutUp",
  zoomInLeft: "zoomOutLeft",
  zoomInRight: "zoomOutRight",
  zoomInUp: "zoomOutDown",
};
export default animates;
