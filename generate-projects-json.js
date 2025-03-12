const fs = require('fs');
const path = require('path');

// 프로젝트 디렉토리 구조를 JSON으로 생성하는 함수
function generateProjectsJson() {
  const projectsDir = path.join(__dirname, 'public/assets/projects');
  
  try {
    // 프로젝트 디렉토리 목록 가져오기
    const projectFolders = fs.readdirSync(projectsDir)
      .filter(item => fs.statSync(path.join(projectsDir, item)).isDirectory());
    
    // 각 프로젝트 폴더의 이미지 파일 목록 가져오기
    const projects = projectFolders.map(folder => {
      const folderPath = path.join(projectsDir, folder);
      const imageFiles = fs.readdirSync(folderPath)
        .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
        .map(file => `/assets/projects/${folder}/${file}`);
      
      // 프로젝트 정보 파일이 있으면 읽기
      let projectInfo = {};
      const infoFilePath = path.join(folderPath, 'info.json');
      if (fs.existsSync(infoFilePath)) {
        projectInfo = JSON.parse(fs.readFileSync(infoFilePath, 'utf8'));
      }
      
      return {
        id: folder,
        name: projectInfo.name || folder,
        title: projectInfo.title || '',
        subtitle: projectInfo.subtitle || '',
        description: projectInfo.description || [],
        area: projectInfo.area || '',
        design: projectInfo.design || '',
        construction: projectInfo.construction || '',
        location: projectInfo.location || '',
        images: imageFiles
      };
    });
    
    // JSON 파일로 저장
    const outputPath = path.join(__dirname, 'public/assets/projects.json');
    fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
    console.log(`Projects JSON generated at ${outputPath}`);
  } catch (error) {
    console.error('Error generating projects JSON:', error);
  }
}

// 스크립트 실행
generateProjectsJson(); 