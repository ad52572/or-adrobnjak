package com.or.pjevaci.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.or.pjevaci.entity.FileEntity;
import com.or.pjevaci.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;


@Service
public class FileService {

    private final FileRepository fileRepository;

    @Autowired
    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public void save(MultipartFile file) throws IOException {
        FileEntity fileEntity = new FileEntity();
        fileEntity.setName(StringUtils.cleanPath(file.getOriginalFilename()));
        fileEntity.setContentType(file.getContentType());
        fileEntity.setData(file.getBytes());
        fileEntity.setSize(file.getSize());

        fileRepository.save(fileEntity);
    }

    public Optional<FileEntity> getFile(String id) {
        return fileRepository.findById(id);
    }

    public void deleteFile(String id) {
        fileRepository.deleteById(id);
    }

    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }
}