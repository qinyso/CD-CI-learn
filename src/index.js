// 1. 引入测试用的 CSS 文件（触发 PostCSS 处理）
import './style.css';

// 2. 动态创建测试 DOM 结构，方便查看样式效果
document.addEventListener('DOMContentLoaded', () => {
  // 创建 flex 布局测试区
  const flexContainer = document.createElement('div');
  flexContainer.className = 'flex-container';
  
  // 创建动画盒子
  const animateBox = document.createElement('div');
  animateBox.className = 'animate-box';
  animateBox.textContent = 'Hover 我';
  
  // 创建卡片
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-title">PostCSS 测试卡片</div>
    <div class="card-content">
      这是嵌套样式测试 <span class="highlight">高亮文字</span>
    </div>
  `;
  
  // 创建按钮（测试 :is() 选择器）
  const btnPrimary = document.createElement('button');
  btnPrimary.className = 'btn-primary';
  btnPrimary.textContent = '主按钮';
  
  const btnSecondary = document.createElement('button');
  btnSecondary.className = 'btn-secondary';
  btnSecondary.textContent = '次按钮';
  
  // 创建 CSS 变量测试区
  const variableTest = document.createElement('div');
  variableTest.className = 'variable-test';
  variableTest.textContent = 'CSS 变量测试';
  
  // 组装 DOM
  flexContainer.appendChild(animateBox);
  flexContainer.appendChild(card);
  flexContainer.appendChild(btnPrimary);
  flexContainer.appendChild(btnSecondary);
  flexContainer.appendChild(variableTest);
  
  // 添加到页面
  document.body.appendChild(flexContainer);
  
  // 控制台提示
  console.log('✅ PostCSS 测试页面加载完成！');
  console.log('👉 打开浏览器开发者工具，查看 Styles 面板验证前缀和嵌套效果');
});